import { useState } from 'react'
import { createQRCode } from '@/services/api/api'

// Update the QRCodeData type to match the actual return from createQRCode
type QRCodeData = {
  id: string;  // Changed from number to string
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

      // Ensure the result has the expected structure
      if (result && typeof result.id === 'string' && typeof result.url === 'string' && typeof result.created_at === 'string') {
        setQRCodeData(result as QRCodeData)
      } else {
        throw new Error('Invalid QR code data structure')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { qrCodeData, error, loading, generateQRCode }
}