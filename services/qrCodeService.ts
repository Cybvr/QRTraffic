// File: services/qrCodeService.ts
import { db } from '@/lib/firebase'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, arrayUnion, arrayRemove, Timestamp } from 'firebase/firestore'

interface QRCodeData {
  customization: {
    bgColor: string;
    color: string;
    frame: string;
  };
  data: {
    url: string;
    name: string;
    qrCodeImage: string;
    scans: number;
  };
  status: ("active" | "Inactive")[];
  type: string;
  userId: string;
  creationDate: Timestamp;
}

interface FolderData {
  id: string;
  name: string;
  qrCodes: string[];
  userId: string;
}

export const createQRCode = async (userId: string, qrCodeData: Omit<QRCodeData, 'userId' | 'creationDate'>) => {
  try {
    const docRef = await addDoc(collection(db, 'qr_codes'), {
      ...qrCodeData,
      userId,
      creationDate: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating QR code:', error)
    throw error
  }
}

export const updateQRCode = async (qrCodeId: string, updateData: Partial<QRCodeData>) => {
  try {
    const qrCodeRef = doc(db, 'qr_codes', qrCodeId)
    await updateDoc(qrCodeRef, updateData)
  } catch (error) {
    console.error('Error updating QR code:', error)
    throw error
  }
}

export const deleteQRCode = async (qrCodeId: string) => {
  try {
    const qrCodeRef = doc(db, 'qr_codes', qrCodeId)
    await deleteDoc(qrCodeRef)
  } catch (error) {
    console.error('Error deleting QR code:', error)
    throw error
  }
}

export const getUserQRCodes = async (userId: string): Promise<(QRCodeData & { id: string })[]> => {
  try {
    const q = query(collection(db, 'qr_codes'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as QRCodeData }))
  } catch (error) {
    console.error('Error fetching user QR codes:', error)
    throw error
  }
}

export const getQRCode = async (qrCodeId: string): Promise<QRCodeData & { id: string }> => {
  try {
    const docRef = doc(db, 'qr_codes', qrCodeId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() as QRCodeData }
    } else {
      throw new Error('QR code not found')
    }
  } catch (error) {
    console.error('Error fetching QR code:', error)
    throw error
  }
}

export const createFolder = async (userId: string, folderName: string) => {
  try {
    const docRef = await addDoc(collection(db, 'folders'), {
      userId,
      name: folderName,
      createdAt: Timestamp.now(),
      qrCodes: []
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating folder:', error)
    throw error
  }
}

export const getUserFolders = async (userId: string): Promise<FolderData[]> => {
  try {
    const q = query(collection(db, 'folders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      qrCodes: doc.data().qrCodes || [],
      userId: doc.data().userId
    }));
  } catch (error) {
    console.error('Error fetching user folders:', error);
    throw error;
  }
};

export const addQRCodeToFolder = async (folderId: string, qrCodeId: string) => {
  try {
    const folderRef = doc(db, 'folders', folderId)
    await updateDoc(folderRef, {
      qrCodes: arrayUnion(qrCodeId)
    })
  } catch (error) {
    console.error('Error adding QR code to folder:', error)
    throw error
  }
}

export const removeQRCodeFromFolder = async (folderId: string, qrCodeId: string) => {
  try {
    const folderRef = doc(db, 'folders', folderId)
    await updateDoc(folderRef, {
      qrCodes: arrayRemove(qrCodeId)
    })
  } catch (error) {
    console.error('Error removing QR code from folder:', error)
    throw error
  }
}

export const deleteFolder = async (folderId: string) => {
  try {
    const folderRef = doc(db, 'folders', folderId)
    await deleteDoc(folderRef)
  } catch (error) {
    console.error('Error deleting folder:', error)
    throw error
  }
}
