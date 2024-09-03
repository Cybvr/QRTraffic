// File: root/app/api/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmailNotification } from '../../../services/mailgunService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();  // Read the raw request body payload

  let event;

  try {
    // Verify event signature
    event = stripe.webhooks.constructEvent(body, sig as string, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed:`, err.message);
    return new NextResponse('Webhook signature verification failed.', { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Handle checkout session completion
      await sendEmailNotification(
        'recipient@example.com',
        'Checkout Session Completed',
        'Your checkout session is complete.',
        '<h1>Your checkout session is complete.</h1>'
      );
      break;
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object;
      // Handle subscription creation
      await sendEmailNotification(
        'recipient@example.com',
        'Subscription Created',
        'A new subscription has been created.',
        '<h1>A new subscription has been created.</h1>'
      );
      break;
    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object;
      // Handle subscription update
      await sendEmailNotification(
        'recipient@example.com',
        'Subscription Updated',
        'A subscription has been updated.',
        '<h1>A subscription has been updated.</h1>'
      );
      break;
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;
      // Handle subscription deletion
      await sendEmailNotification(
        'recipient@example.com',
        'Subscription Deleted',
        'A subscription has been canceled or deleted.',
        '<h1>A subscription has been canceled or deleted.</h1>'
      );
      break;
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      // Handle successful payment
      await sendEmailNotification(
        'recipient@example.com',
        'Invoice Payment Succeeded',
        'An invoice payment was successful.',
        '<h1>An invoice payment was successful.</h1>'
      );
      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;
      // Handle failed payment
      await sendEmailNotification(
        'recipient@example.com',
        'Invoice Payment Failed',
        'An invoice payment attempt failed.',
        '<h1>An invoice payment attempt failed.</h1>'
      );
      break;
    case 'invoice.finalized':
      const invoiceFinalized = event.data.object;
      // Handle invoice finalization
      await sendEmailNotification(
        'recipient@example.com',
        'Invoice Finalized',
        'An invoice has been finalized.',
        '<h1>An invoice has been finalized.</h1>'
      );
      break;

    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}