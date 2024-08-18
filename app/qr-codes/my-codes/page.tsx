// app/qr-codes/my-codes/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode.react'
// import { auth } from '@/services/firebase'
// import { supabase } from '@/services/supabase'

interface QRCodeData {
  id: string
  url: string
  title: string
  created_at: string
}

// Mock data for demo purposes
const mockQRCodes: QRCodeData[] = [
  { id: '1', url: 'https://example.com/1', title: 'Example QR Code 1', created_at: '2023-08-01T00:00:00Z' },
  { id: '2', url: 'https://example.com/2', title: 'Example QR Code 2', created_at: '2023-08-02T00:00:00Z' },
  { id: '3', url: 'https://example.com/3', title: 'Example QR Code 3', created_at: '2023-08-03T00:00:00Z' },
]

export default function MyCodes() {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching QR codes
    const fetchQRCodes = async () => {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setQRCodes(mockQRCodes)
      setLoading(false)
    }
    fetchQRCodes()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My QR Codes</h1>
      <Link href="/qr-codes/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block">
        Create New QR Code
      </Link>
      {qrCodes.length === 0 ? (
        <p>You haven&apos;t created any QR codes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qrCode) => (
            <div key={qrCode.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{qrCode.title}</h2>
              <div className="mb-4">
                <QRCode value={qrCode.url} size={150} />
              </div>
              <p className="text-sm text-gray-600 mb-2">Created: {new Date(qrCode.created_at).toLocaleDateString()}</p>
              <Link href={`/qr-codes/${qrCode.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}