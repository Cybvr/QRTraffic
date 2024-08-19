'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import QRCodeGenerator from '@/components/qr-tools/QRCodeGenerator'
import QRCodeDisplay from '@/components/qr-tools/QRCodeDisplay'
import { useQRCode } from '@/hooks/useQRCode'

export default function DashboardPage() {
  const [user] = useState({ email: 'demo@example.com' }) // Demo user
  const router = useRouter()
  const { qrCodeData, error, loading, generateQRCode } = useQRCode()

  const handleLogout = async () => {
    // Implement actual logout logic here
    // await auth.signOut()
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      <Button onClick={handleLogout} className="mb-8">
        Logout
      </Button>
      <QRCodeGenerator onGenerate={generateQRCode} />
      {loading && <p>Generating QR Code...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {qrCodeData && (
        <QRCodeDisplay
          qrCode={qrCodeData.url}
          customization={{}} // Replace with appropriate value or remove if not needed
        />
      )}
    </div>
  )
}