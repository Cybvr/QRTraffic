import { useState } from 'react'
import { createQRCode } from '@/services/api'

export const useQRCode = () => {
  const [qrCode, setQRCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateQRCode = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createQRCode(url)
      setQRCode(result.qrCode)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { qrCode, error, loading, generateQRCode }
}