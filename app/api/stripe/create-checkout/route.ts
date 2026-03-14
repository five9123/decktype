import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import { requireAuth } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const { user, supabase, response: authError } = await requireAuth();
  if (authError) return authError;

  const { priceId } = await request.json() as { priceId: 'monthly' | 'yearly' };
  const resolvedPriceId = STRIPE_PRICES[priceId];
  if (!resolvedPriceId) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }

  // Fetch existing stripe_customer_id if any
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();

  const origin = request.headers.get('origin') ?? 'https://typee.app';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: profile?.stripe_customer_id || undefined,
    customer_email: profile?.stripe_customer_id ? undefined : user.email,
    line_items: [{ price: resolvedPriceId, quantity: 1 }],
    success_url: `${origin}/dashboard?upgraded=true`,
    cancel_url: `${origin}/pricing`,
    metadata: { user_id: user.id },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
