// File: app/qr-codes/edit/[id]/page.tsx

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getQRCode, updateQRCode } from '@/services/qrCodeService'
import QRCodeContentForm from '../../QRCodeContentForm'
import QRCodeCustomizer from '../../QRCodeCustomizer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    // Ensure frameUrl is retained during customization change
    customization = {
      ...customization,
      frameUrl: customization.frameUrl || '' // Default to empty string if frameUrl is not present
    }
    setQRCodeData(prev => ({ ...prev, customization }))
  }

  const handleSave = async () => {
    if (!user || !qrCodeData) return
    try {
      await updateQRCode(qrCodeData.id, qrCodeData)
      router.push('/qr-codes/my-codes')
    } catch (error) {
      console.error('Error saving QR code:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!qrCodeData) return <div>QR code not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit QR Code</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <QRCodeContentForm
            type={qrCodeData.type}
            initialContent={qrCodeData.content}
            initialName={qrCodeData.name}
            onSubmit={handleContentSubmit}
          />
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent>
          <QRCodeCustomizer
            customization={qrCodeData.customization}
            initialData={qrCodeData}
            onCustomizationChange={handleCustomizationChange}
            onComplete={handleSave}
            initialContent={qrCodeData.content}
            initialName={qrCodeData.name}
          />
        </CardContent>
      </Card>
      <Button onClick={handleSave} className="w-full">Save Changes</Button>
    </div>
  )
}