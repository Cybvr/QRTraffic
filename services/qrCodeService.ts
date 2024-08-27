import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, deleteDoc, query, where, Timestamp, increment, setDoc } from 'firebase/firestore';

interface QRCodeData {
  id?: string;
  type: string;
  content: string;
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

interface QRScanData {
  date: Timestamp;
  qrCodeId: string;
  userLocation?: string;
  deviceType: string;
  campaignType: string;
  city: string;
  country: string;
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
) => {
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

export const updateQRCode = async (qrCodeId: string, data: Partial<QRCodeData>) => {
  try {
    const qrCodeRef = doc(db, 'qr_codes', qrCodeId);
    await updateDoc(qrCodeRef, {
      ...data,
      lastModified: Timestamp.now()
    });
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

export const deleteQRCode = async (qrCodeId: string) => {
  try {
    await deleteDoc(doc(db, 'qr_codes', qrCodeId));
  } catch (error) {
    console.error('Error deleting QR code:', error);
    throw new Error('Failed to delete QR code');
  }
};

export const saveQRScan = async (scanData: QRScanData) => {
  try {
    // Save scan data
    await addDoc(collection(db, 'qr_scans'), scanData);

    // Update QR code total scans
    const qrCodeRef = doc(db, 'qr_codes', scanData.qrCodeId);
    await updateDoc(qrCodeRef, {
      scanCount: increment(1)
    });

    // Update or create daily stats
    const dailyStatsRef = doc(db, 'daily_stats', scanData.date.toDate().toISOString().split('T')[0]);
    await setDoc(dailyStatsRef, {
      totalScans: increment(1),
      uniqueUsers: increment(1) // This is simplified; you'd need more logic for truly unique users
    }, { merge: true });

    console.log('Scan data saved successfully');
  } catch (error) {
    console.error('Error saving scan data:', error);
    throw new Error('Failed to save scan data');
  }
};

export const getAnalytics = async (startDate: Date, endDate: Date, qrCodeId?: string) => {
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
      scansData: [],
      deviceData: {},
      cityData: {},
      countryData: {}
    };

    scansSnapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.date.toDate().toISOString().split('T')[0];

      // Aggregate scans data
      analytics.scansData.push({ date, scans: 1, uniqueUsers: 1 });

      // Aggregate device data
      analytics.deviceData[data.deviceType] = (analytics.deviceData[data.deviceType] || 0) + 1;

      // Aggregate city data
      analytics.cityData[data.city] = (analytics.cityData[data.city] || 0) + 1;

      // Aggregate country data
      analytics.countryData[data.country] = (analytics.countryData[data.country] || 0) + 1;
    });

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