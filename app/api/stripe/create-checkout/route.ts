import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import { checkRateLimit, requireAuth } from '@/lib/api-middleware';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, 'stripe-checkout', 5, 60_000);
  if (limited) return limited;

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const { user, supabase, response: authError } = await requireAuth();
  if (authError) return authError;

  const { priceId, referralCode } = await request.json() as { priceId: 'monthly' | 'yearly'; referralCode?: string };
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

  // Resolve referral code → Stripe promotion code ID
  let stripePromoCodeId: string | null = null;
  if (referralCode && typeof referralCode === 'string') {
    const adminClient = createSupabaseAdmin();
    const { data: refData } = await adminClient
      .from('referral_codes')
      .select('stripe_promotion_code_id')
      .eq('code', referralCode.toUpperCase().trim())
      .eq('active', true)
      .single();
    stripePromoCodeId = refData?.stripe_promotion_code_id ?? null;
  }

  const rawOrigin = request.headers.get('origin') ?? '';
  const allowedOrigins = [
    'https://typee.app',
    'https://www.typee.app',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];
  const origin = allowedOrigins.includes(rawOrigin) ? rawOrigin : 'https://typee.app';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: profile?.stripe_customer_id || undefined,
    customer_email: profile?.stripe_customer_id ? undefined : user.email,
    line_items: [{ price: resolvedPriceId, quantity: 1 }],
    success_url: `${origin}/dashboard?upgraded=true`,
    cancel_url: `${origin}/pricing`,
    metadata: {
      user_id: user.id,
      referral_code: referralCode ?? '',
      price_interval: priceId,
    },
    // Auto-apply referral discount if present; otherwise show manual promo code input
    ...(stripePromoCodeId
      ? { discounts: [{ promotion_code: stripePromoCodeId }] }
      : { allow_promotion_codes: true }
    ),
  });

  return NextResponse.json({ url: session.url });
}
