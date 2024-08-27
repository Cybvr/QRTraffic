// File: app/api/refer/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, increment, query, where, getDocs } from 'firebase/firestore';

const handleReferral = async (referrerId: string, refereeId: string) => {
  // Add referral record
  await addDoc(collection(db, 'referrals'), { referrerId, refereeId, timestamp: new Date() });

  // Increment QR codes for both users
  const qrCodesRef = collection(db, 'qr_codes');

  const referrerQrCodeQuery = query(qrCodesRef, where('userId', '==', referrerId));
  const refereeQrCodeQuery = query(qrCodesRef, where('userId', '==', refereeId));

  const referrerQrCodeSnapshots = await getDocs(referrerQrCodeQuery);
  const refereeQrCodeSnapshots = await getDocs(refereeQrCodeQuery);

  referrerQrCodeSnapshots.forEach(docSnapshot => {
    updateDoc(docSnapshot.ref, { earnedCount: increment(1) });
  });

  refereeQrCodeSnapshots.forEach(docSnapshot => {
    updateDoc(docSnapshot.ref, { earnedCount: increment(1) });
  });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referrerId, refereeId } = body;

    await handleReferral(referrerId, refereeId);

    return NextResponse.json({ message: 'Referral processed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process referral' }, { status: 500 });
  }
}