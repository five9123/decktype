import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { requireAuth } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const { user, supabase, response: authError } = await requireAuth();
  if (authError) return authError;

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 400 });
  }

  const rawOrigin = request.headers.get('origin') ?? '';
  const allowedOrigins = [
    'https://typee.app',
    'https://www.typee.app',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];
  const origin = allowedOrigins.includes(rawOrigin) ? rawOrigin : 'https://typee.app';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${origin}/billing`,
  });

  return NextResponse.json({ url: portalSession.url });
}
