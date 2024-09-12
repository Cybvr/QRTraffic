// lib/stripe.ts
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env['STRIPE_SECRET_KEY'];

export const isStripeEnabled = !!stripeSecretKey;

let stripe: Stripe | null = null;

if (isStripeEnabled) {
  try {
    stripe = new Stripe(stripeSecretKey!, {
      apiVersion: '2024-06-20',
    });
    console.log('Stripe client initialized successfully');
  } catch (error) {
    console.error('Error initializing Stripe client:', error);
    // Don't throw an error here, just log it
  }
} else {
  console.log('Stripe is disabled: STRIPE_SECRET_KEY is not set');
}

export { stripe };