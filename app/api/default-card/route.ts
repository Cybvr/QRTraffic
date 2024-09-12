// app/api/set-default-card/route.ts
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

    // Update the customer's default payment method in Stripe
    if (stripe) await stripe.customers.update(stripeCustomerId, {
      invoice_settings: { default_payment_method: cardId },
    });

    // Update the user's default payment method in Firestore
    await updateDoc(doc(db, 'users', userId), { defaultPaymentMethod: cardId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting default card:', error);
    return NextResponse.json({ error: 'Failed to set default card' }, { status: 500 });
  }
}