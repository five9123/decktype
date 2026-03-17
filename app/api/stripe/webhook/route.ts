import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  // Idempotency guard: skip already-processed events
  const { data: existing } = await supabase
    .from('webhook_events')
    .select('event_id')
    .eq('event_id', event.id)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ received: true });
  }
  await supabase.from('webhook_events').insert({ event_id: event.id, event_type: event.type });

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      await supabase.from('profiles').update({
        plan: 'pro',
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        subscription_status: 'active',
      }).eq('id', userId);

      // Track referral conversion if a code was used
      const referralCode = session.metadata?.referral_code;
      if (referralCode) {
        const { data: refRow } = await supabase
          .from('referral_codes')
          .select('id')
          .eq('code', referralCode.toUpperCase())
          .single();
        if (refRow) {
          await supabase.from('referral_conversions').insert({
            referral_code_id: refRow.id,
            user_id: userId,
            stripe_session_id: session.id,
            plan: session.metadata?.price_interval ?? 'unknown',
          });
        }
      }
      break;
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;
      const status = sub.status;

      await supabase.from('profiles').update({
        subscription_status: status,
        plan: status === 'active' ? 'pro' : 'free',
      }).eq('stripe_customer_id', customerId);
      break;
    }

    case 'customer.subscription.deleted':
    case 'invoice.payment_failed': {
      const obj = event.data.object as Stripe.Subscription | Stripe.Invoice;
      const customerId = (obj as Stripe.Subscription).customer as string
        ?? (obj as Stripe.Invoice).customer as string;

      await supabase.from('profiles').update({
        plan: 'free',
        subscription_status: 'inactive',
        stripe_subscription_id: null,
      }).eq('stripe_customer_id', customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
