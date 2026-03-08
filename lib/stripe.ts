import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  // Allow build-time import without key
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' })
  : null;

export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY ?? '',
  yearly: process.env.STRIPE_PRICE_YEARLY ?? '',
};
