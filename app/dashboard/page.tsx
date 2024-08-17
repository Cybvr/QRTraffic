'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import QRCodeGenerator from '@/components/qr-tools/QRCodeGenerator'
import QRCodeDisplay from '@/components/qr-tools/QRCodeDisplay'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useQRCode } from '@/hooks/useQRCode'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const { qrCode, error, loading, generateQRCode } = useQRCode()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await auth.signOut()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      <Button onClick={handleLogout} className="mb-8">Logout</Button>

      <QRCodeGenerator onGenerate={generateQRCode} />

      {loading && <p>Generating QR Code...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {qrCode && <QRCodeDisplay qrCode={qrCode} />}
    </div>
  )
}