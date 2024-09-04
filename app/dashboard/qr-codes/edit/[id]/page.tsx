'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getQRCode, updateQRCode } from '@/services/qrCodeService'
import QRCodeContentForm from '../../QRCodeContentForm'
import QRCodeCustomizer from '../../QRCodeCustomizer'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function EditQRCode({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [qrCodeData, setQRCodeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQRCodeData = async () => {
      if (!user) return
      try {
        const data = await getQRCode(params.id)
        setQRCodeData(data)
      } catch (error) {
        console.error('Error fetching QR code data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadQRCodeData()
  }, [params.id, user])

  const handleContentSubmit = (data: any) => {
    setQRCodeData(prev => ({ ...prev, ...data }))
  }

  const handleCustomizationChange = (customization: any) => {
    customization = {
      ...customization,
      frameUrl: customization.frameUrl || ''
    }
    setQRCodeData(prev => ({ ...prev, customization }))
  }

  const handleSave = async () => {
    if (!user || !qrCodeData) return
    try {
      await updateQRCode(qrCodeData.id, qrCodeData)
      router.push('/dashboard/qr-codes/my-codes')
    } catch (error) {
      console.error('Error saving QR code:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!qrCodeData) return <div>QR code not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard/qr-codes/my-codes" className="flex items-center text-blue-600 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to My QR Codes
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit QR Code</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <QRCodeContentForm
        type={qrCodeData.type}
        initialContent={qrCodeData.content}
        initialName={qrCodeData.name}
        onSubmit={handleContentSubmit}
      />
      <QRCodeCustomizer
        customization={qrCodeData.customization}
        initialData={qrCodeData}
        onCustomizationChange={handleCustomizationChange}
        onComplete={handleSave}
        initialContent={qrCodeData.content}
        initialName={qrCodeData.name}
      />
    </div>
  )
}