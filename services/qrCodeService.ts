// services/qrCodeService.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, deleteDoc, query, where, Timestamp, increment, setDoc } from 'firebase/firestore';

export interface QRCodeData {
  id?: string;
  type: string;
  content: any;
  name: string;
  customization: {
    frame: string;
    frameColor: string;
    frameText: string;
    backgroundColor: string;
    textColor: string;
    qrCodeColor: string;
    logo: string;
    transparentBackground: boolean;
    frameUrl: string;
    customLogo: string;
  };
  userId: string;
  creationDate: Timestamp;
  lastModified: Timestamp;
  scanCount: number;
  status: 'Active' | 'Inactive';
}

export interface QRScanData {
  date: Timestamp;
  qrCodeId: string;
  userLocation?: string;
  deviceType: string;
  campaignType: string;
  city: string;
  country: string;
  userId: string;
}

export interface ScanData {
  date: string;
  scans: number;
  uniqueUsers: string[];
}

export const getQRCodeCount = async (userId: string): Promise<number> => {
  try {
    const q = query(collection(db, 'qr_codes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error fetching QR code count:', error);
    return 0;
  }
};

export const createQRCode = async (
  userId: string,
  data: Omit<QRCodeData, 'id' | 'userId' | 'creationDate' | 'lastModified' | 'scanCount' | 'status'>
): Promise<string> => {
  try {
    const currentCount = await getQRCodeCount(userId);
    if (currentCount >= 5) {
      throw new Error('QR code limit reached. Please upgrade your plan.');
    }

    const docRef = await addDoc(collection(db, 'qr_codes'), {
      ...data,
      userId,
      creationDate: Timestamp.now(),
      lastModified: Timestamp.now(),
      scanCount: 0,
      status: 'Active'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating QR code:', error);
    throw error;
  }
};

export const updateQRCode = async (qrCodeId: string, data: Partial<QRCodeData>): Promise<void> => {
  try {
    console.log('Updating QR code:', qrCodeId, data); // Debugging log
    const qrCodeRef = doc(db, 'qr_codes', qrCodeId);
    await updateDoc(qrCodeRef, {
      ...data,
      lastModified: Timestamp.now()
    });
    console.log('QR code updated successfully'); // Confirmation log
  } catch (error) {
    console.error('Error updating QR code:', error);
    throw new Error('Failed to update QR code');
  }
};

export const getQRCode = async (qrCodeId: string): Promise<QRCodeData> => {
  try {
    const docRef = doc(db, 'qr_codes', qrCodeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as QRCodeData;
    } else {
      throw new Error('QR code not found');
    }
  } catch (error) {
    console.error('Error fetching QR code:', error);
    throw new Error('Failed to fetch QR code');
  }
};

export const getUserQRCodes = async (userId: string): Promise<QRCodeData[]> => {
  try {
    const q = query(collection(db, 'qr_codes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QRCodeData));
  } catch (error) {
    console.error('Error fetching user QR codes:', error);
    throw new Error('Failed to fetch user QR codes');
  }
};

export const deleteQRCode = async (qrCodeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'qr_codes', qrCodeId));
  } catch (error) {
    console.error('Error deleting QR code:', error);
    throw new Error('Failed to delete QR code');
  }
};

export const saveQRScan = async (scanData: QRScanData): Promise<void> => {
  try {
    console.log('Attempting to save scan data:', scanData);
    await addDoc(collection(db, 'qr_scans'), scanData);

    console.log('Incrementing QR code scan count for:', scanData.qrCodeId);
    const qrCodeRef = doc(db, 'qr_codes', scanData.qrCodeId);
    await updateDoc(qrCodeRef, {
      scanCount: increment(1)
    });

    const dailyStatsRef = doc(db, 'daily_stats', scanData.date.toDate().toISOString().split('T')[0]);
    await setDoc(dailyStatsRef, {
      totalScans: increment(1),
      uniqueUsers: increment(1)
    }, { merge: true });

    console.log('Scan data saved successfully');
  } catch (error) {
    console.error('Error saving scan data:', error);
    throw new Error('Failed to save scan data');
  }
};

export const getAnalytics = async (startDate: Date, endDate: Date, qrCodeId?: string): Promise<{scansData: ScanData[], deviceData: Record<string, number>, cityData: Record<string, number>, countryData: Record<string, number>}> => {
  try {
    let scansQuery = query(
      collection(db, 'qr_scans'),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate))
    );

    if (qrCodeId) {
      scansQuery = query(scansQuery, where('qrCodeId', '==', qrCodeId));
    }

    const scansSnapshot = await getDocs(scansQuery);

    const analytics = {
      scansData: [] as ScanData[],
      deviceData: {} as Record<string, number>,
      cityData: {} as Record<string, number>,
      countryData: {} as Record<string, number>
    };

    scansSnapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.date.toDate().toISOString().split('T')[0];

      const existingData = analytics.scansData.find(item => item.date === date);
      if (existingData) {
        existingData.scans += 1;
        existingData.uniqueUsers.push(data.userId);
      } else {
        analytics.scansData.push({ date, scans: 1, uniqueUsers: [data.userId] });
      }

      analytics.deviceData[data.deviceType] = (analytics.deviceData[data.deviceType] || 0) + 1;
      analytics.cityData[data.city] = (analytics.cityData[data.city] || 0) + 1;
      analytics.countryData[data.country] = (analytics.countryData[data.country] || 0) + 1;
    });

    analytics.scansData = analytics.scansData.map(scan => ({
      ...scan,
      uniqueUsers: [...new Set(scan.uniqueUsers)]
    }));

    return analytics;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      scansData: [],
      deviceData: {},
      cityData: {},
      countryData: {}
    };
  }
};