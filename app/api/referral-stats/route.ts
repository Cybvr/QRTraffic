// File: app/api/referral-stats/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.userId as string; // Extract userId from request query, adjust as necessary
    const stats = await getReferralStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referral stats' });
  }
}