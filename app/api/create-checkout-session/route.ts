// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeEnabled } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const PLANS = {
  basic: 'price_1PsMXh2N40sxeNMwqFF0TRYE',
  enterprise: 'price_1PsMWd2N40sxeNMw5pXwn5qQ',
  pro: 'price_1PsMVT2N40sxeNMwkhZxgosH',
};

export async function POST(request: NextRequest) {
  try {
    if (!isStripeEnabled) {
      return NextResponse.json({ error: 'Stripe is not enabled' }, { status: 400 });
    }

    const { planName, userId } = await request.json();

    if (!PLANS[planName as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'User not found or no Stripe customer ID' }, { status: 400 });
    }

    if (!stripe) {
      return NextResponse.json({ error: 'Stripe is not initialized' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PLANS[planName as keyof typeof PLANS],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
      customer: stripeCustomerId,
      client_reference_id: userId,
      metadata: {
        userId: userId,
        planName: planName,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}