import { db } from '@/lib/firebase'
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, deleteDoc, query, where, Timestamp } from 'firebase/firestore'

interface QRCodeData {
  id?: string
  type: string
  content: string
  name: string
  customization: {
    frame: string
    frameColor: string
    frameText: string
    backgroundColor: string
    textColor: string
    qrCodeColor: string
    logo: string
    transparentBackground: boolean
    frameUrl: string
    customLogo: string
  }
  userId: string
  creationDate: Timestamp
  lastModified: Timestamp
  scanCount: number
  status: 'Active' | 'Inactive'
}

export const createQRCode = async (userId: string, data: Omit<QRCodeData, 'id' | 'userId' | 'creationDate' | 'lastModified' | 'scanCount' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'qr_codes'), {
      ...data,
      userId,
      creationDate: Timestamp.now(),
      lastModified: Timestamp.now(),
      scanCount: 0,
      status: 'Active'
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating QR code:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to create QR code: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while creating the QR code')
    }
  }
}

export const updateQRCode = async (qrCodeId: string, data: Partial<QRCodeData>) => {
  try {
    const qrCodeRef = doc(db, 'qr_codes', qrCodeId)
    await updateDoc(qrCodeRef, {
      ...data,
      lastModified: Timestamp.now()
    })
  } catch (error) {
    console.error('Error updating QR code:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to update QR code: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while updating the QR code')
    }
  }
}

export const getQRCode = async (qrCodeId: string): Promise<QRCodeData> => {
  try {
    const docRef = doc(db, 'qr_codes', qrCodeId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as QRCodeData
    } else {
      throw new Error('QR code not found')
    }
  } catch (error) {
    console.error('Error fetching QR code:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch QR code: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while fetching the QR code')
    }
  }
}

export const getUserQRCodes = async (userId: string): Promise<QRCodeData[]> => {
  try {
    const q = query(collection(db, 'qr_codes'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QRCodeData))
  } catch (error) {
    console.error('Error fetching user QR codes:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user QR codes: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while fetching user QR codes')
    }
  }
}

export const deleteQRCode = async (qrCodeId: string) => {
  try {
    await deleteDoc(doc(db, 'qr_codes', qrCodeId))
  } catch (error) {
    console.error('Error deleting QR code:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete QR code: ${error.message}`)
    } else {
      throw new Error('An unknown error occurred while deleting the QR code')
    }
  }
}