import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId, userId } = await request.json();

    // Get the user's Stripe customer ID
    const userDoc = await getDoc(doc(db, 'users', userId));
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'User not found or no Stripe customer ID' }, { status: 400 });
    }

   
    if (!stripe) {
      throw new Error('Stripe is not initialized');
    }
    // Attach the payment method to the customer
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomerId,
    });

    // Set as default payment method if it's the first one
    const customerPaymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: 'card',
    });

    if (customerPaymentMethods.data.length === 1) {
      await stripe.customers.update(stripeCustomerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
      await updateDoc(doc(db, 'users', userId), { defaultPaymentMethod: paymentMethodId });
    }

    return NextResponse.json({ 
      paymentMethod,
      isDefault: customerPaymentMethods.data.length === 1
    });
  } catch (error) {
    console.error('Error adding payment method:', error);
    return NextResponse.json({ error: 'Failed to add payment method' }, { status: 500 });
  }
}