// app/api/remove-card/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { cardId, userId } = await request.json();

    // Get the user's Stripe customer ID
    const userDoc = await getDoc(doc(db, 'users', userId));
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'User not found or no Stripe customer ID' }, { status: 400 });
    }

    // Check if stripe object is available
    if (!stripe) {
      throw new Error('Stripe object is not initialized');
    }

    // Remove the payment method from Stripe
    await stripe.paymentMethods.detach(cardId);

    // If this was the default payment method, update the customer's default payment method
    if (userDoc.data()?.defaultPaymentMethod === cardId) {
      await updateDoc(doc(db, 'users', userId), { defaultPaymentMethod: null });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing card:', error);
    return NextResponse.json({ error: 'Failed to remove card' }, { status: 500 });
  }
}