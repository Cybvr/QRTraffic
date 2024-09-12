// services/api/api.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Define a type for the expected return value
type QRCodeData = {
  id: string;
  url: string;
  created_at: string;
}

export const createQRCode = async (url: string): Promise<QRCodeData> => {
  try {
    const qrCodeRef = await addDoc(collection(db, 'qrcodes'), {
      url,
      created_at: serverTimestamp()
    });

    return {
      id: qrCodeRef.id,
      url,
      created_at: new Date().toISOString() // Using local time as a fallback
    };
  } catch (error) {
    console.error('Error creating QR code:', error);
    throw new Error('Failed to create QR code');
  }
}