import { useState } from 'react'
import { createQRCode } from '@/services/api'

// Define the shape of the QR code data
type QRCodeData = {
  id: number;
  url: string;
  created_at: string;
}

export const useQRCode = () => {
  const [qrCodeData, setQRCodeData] = useState<QRCodeData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateQRCode = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createQRCode(url)
      setQRCodeData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { qrCodeData, error, loading, generateQRCode }
}