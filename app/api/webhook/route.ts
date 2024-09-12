// File: api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendEmailNotification } from '@/services/mailgunService'; // Ensure this path is correct
import { db } from '@/lib/firebase'; // Ensure this path is correct for your Firebase setup
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Use the required API version
});

// Function to update user subscription in Firestore based on the session data
async function updateUserSubscription(session: any) {
  const userId = session.client_reference_id; // Get user ID from the session
  const subscriptionId = session.subscription; // Get subscription ID from the session
  if (!userId) {
    console.error('No user ID found in the session');
    return;
  }
  const userRef = doc(db, 'users', userId); // Reference to the user in Firestore
  const subscriptionRef = doc(db, 'subscriptions', subscriptionId);

  // Set or update the user's subscription data in Firestore
  await setDoc(userRef, {
    subscriptionId: subscriptionId,
    subscriptionStatus: session.status,
    // Add any other relevant subscription data if needed
  }, { merge: true });

  // Update or create the subscription document
  await setDoc(subscriptionRef, {
    userId: userId,
    status: session.status,
    planId: session.plan?.id,
    currentPeriodEnd: new Date(session.current_period_end * 1000),
  }, { merge: true });
}

// Function to handle subscription deletion
async function handleSubscriptionDeleted(subscription: any) {
  const subscriptionRef = doc(db, 'subscriptions', subscription.id);
  await deleteDoc(subscriptionRef);

  // Update user document to remove subscription reference
  if (subscription.metadata.userId) {
    const userRef = doc(db, 'users', subscription.metadata.userId);
    await setDoc(userRef, {
      subscriptionId: null,
      subscriptionStatus: 'canceled',
    }, { merge: true });
  }
}

// Handle incoming POST requests from Stripe webhooks
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature'); // Get the Stripe signature
  const body = await request.text(); // Read the request body
  let event;

  // Ensure the webhook secret is defined
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new NextResponse('Webhook secret is not set', { status: 500 });
  }

  try {
    // Construct the event from the request body and the signature
    event = stripe.webhooks.constructEvent(body, sig as string, webhookSecret);
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed:`, err.message);
    return new NextResponse('Webhook signature verification failed.', { status: 400 });
  }

  // Handle the specific event types from Stripe
  switch (event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const session = event.data.object; // Get the session data from the event
      await updateUserSubscription(session); // Update the user's subscription
      await sendEmailNotification(
        session.customer_email,
        `Subscription ${event.type.split('.')[1]}`,
        `Your subscription has been ${event.type.split('.')[1]}.`,
        `<h1>Your subscription has been ${event.type.split('.')[1]}.</h1>`
      );
      break;
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      await handleSubscriptionDeleted(deletedSubscription);
      await sendEmailNotification(
        deletedSubscription.customer_email,
        `Subscription Canceled`,
        `Your subscription has been canceled.`,
        `<h1>Your subscription has been canceled.</h1>`
      );
      break;
    case 'invoice.payment_succeeded':
    case 'invoice.payment_failed':
    case 'invoice.finalized':
      const invoice = event.data.object; // Get the invoice data from the event
      await sendEmailNotification(
        invoice.customer_email,
        `Invoice ${event.type.split('.')[1]}`,
        `An invoice has been ${event.type.split('.')[1]}.`,
        `<h1>An invoice has been ${event.type.split('.')[1]}.</h1>`
      );
      break;
    default:
      console.warn(`Unhandled event type ${event.type}`); // Log any unhandled event types
  }

  return NextResponse.json({ received: true }); // Acknowledge receipt of the event
}