// File: app/api/refer/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, increment, doc, query, where, getDocs } from 'firebase/firestore';

const handleReferral = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { referrerId, refereeId } = req.body;

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

    res.status(200).json({ message: 'Referral processed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process referral' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handleReferral(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}