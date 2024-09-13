// services/api/fetchers.ts
import { stripe, isStripeEnabled } from '../../lib/stripe';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Stripe from 'stripe';

export async function fetchInvoices(userId: string) {
  try {
    if (!isStripeEnabled) {
      throw new Error('Stripe is not enabled');
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) throw new Error('No Stripe customer ID found for user');
    if (!stripe) throw new Error('Stripe instance is not initialized');

    const stripeInstance = stripe as Stripe;

    const invoices = await stripeInstance.invoices.list({
      customer: stripeCustomerId,
      limit: 10,
    });

    return invoices.data.map(invoice => ({
      id: invoice.id,
      date: new Date(invoice.created * 1000).toISOString(),
      amount: (invoice.total / 100).toFixed(2),
      status: invoice.status || 'unknown',
    }));
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to fetch invoices');
  }
}

export async function fetchSubscriptionStatus(userId: string) {
  try {
    if (!isStripeEnabled) {
      return { planName: 'Free', price: '£0', period: 'month' };
    }

    const subscriptionQuery = query(collection(db, 'subscriptions'), where('userId', '==', userId));
    const subscriptionSnapshot = await getDocs(subscriptionQuery);

    if (subscriptionSnapshot.empty) {
      return { planName: 'Free', price: '£0', period: 'month' };
    }

    if (!stripe) throw new Error('Stripe instance is not initialized');
    const stripeInstance = stripe as Stripe;

    const subscription = subscriptionSnapshot.docs[0].data();
    const stripeSubscription = await stripeInstance.subscriptions.retrieve(subscription.stripeSubscriptionId);
    const price = stripeSubscription.items.data[0].price;

    return {
      planName: price.nickname || 'Custom',
      price: `£${(price.unit_amount! / 100).toFixed(2)}`,
      period: price.recurring?.interval || 'month',
      status: stripeSubscription.status,
    };
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    throw new Error('Failed to fetch subscription status');
  }
}

export async function fetchCards(userId: string) {
  try {
    if (!isStripeEnabled) {
      throw new Error('Stripe is not enabled');
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) throw new Error('No Stripe customer ID found for user');
    if (!stripe) throw new Error('Stripe instance is not initialized');
    const stripeInstance = stripe as Stripe;

    const paymentMethods = await stripeInstance.paymentMethods.list({
      customer: stripeCustomerId,
      type: 'card',
    });

    return paymentMethods.data.map(method => ({
      id: method.id,
      brand: method.card!.brand,
      last4: method.card!.last4,
      expiryMonth: method.card!.exp_month.toString(),
      expiryYear: method.card!.exp_year.toString(),
      isDefault: method.id === userDoc.data()?.defaultPaymentMethod,
    }));
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw new Error('Failed to fetch cards');
  }
}

export async function createCheckoutSession(planName: string, userId: string) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planName, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

export async function removeCard(cardId: string, userId: string) {
  try {
    const response = await fetch('/api/remove-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardId, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove card');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing card:', error);
    throw new Error('Failed to remove card');
  }
}

export async function setDefaultCard(cardId: string, userId: string) {
  try {
    const response = await fetch('/api/set-default-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardId, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to set default card');
    }

    return await response.json();
  } catch (error) {
    console.error('Error setting default card:', error);
    throw new Error('Failed to set default card');
  }
}