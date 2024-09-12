// File: app/api/referral-stats/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';

const getReferralStats = async (userId: string) => {
  const referralsRef = collection(db, 'referrals');
  const q = query(referralsRef, where('referrerId', '==', userId));
  const querySnapshot = await getDocs(q);
  const referrals = querySnapshot.size;

  const qrCodesRef = collection(db, 'qr_codes');
  const qrCodesSnap = await getDocs(query(qrCodesRef, where('userId', '==', userId)));
  const qrCodesEarned = qrCodesSnap.size;

  return { referrals, qrCodesEarned };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;
    const stats = await getReferralStats(userId);
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch referral stats' }, { status: 500 });
  }
}