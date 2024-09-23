'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getQRCode, updateQRCode } from '@/services/qrCodeService'
import QRCodeCustomizer from '@/app/dashboard/common/QRCodeCustomizer'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import LinkTool from '@/app/dashboard/qr-codes/qr-tools/LinkTool'
import VCardTool from '@/app/dashboard/qr-codes/qr-tools/VCardTool'
import MenuTool from '@/app/dashboard/qr-codes/qr-tools/MenuTool'
import FacebookTool from '@/app/dashboard/qr-codes/qr-tools/FacebookTool'
import BusinessTool from '@/app/dashboard/qr-codes/qr-tools/BusinessTool'
import WiFiTool from '@/app/dashboard/qr-codes/qr-tools/WiFiTool'

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

  const handleContentUpdate = (data: any) => {
    setQRCodeData(prev => ({ ...prev, content: data }))
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

  const renderContentTool = () => {
    switch (qrCodeData.type) {
      case 'Link':
        return <LinkTool setQRCodeData={handleContentUpdate} />
      case 'VCard':
        return <VCardTool setQRCodeData={handleContentUpdate} />
      case 'Restaurants Menu':
        return <MenuTool setQRCodeData={handleContentUpdate} />
      case 'Facebook':
        return <FacebookTool setQRCodeData={handleContentUpdate} />
      case 'Business Page':
        return <BusinessTool setQRCodeData={handleContentUpdate} />
      case 'WiFi':
        return <WiFiTool setQRCodeData={handleContentUpdate} />
      default:
        return null
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
      {renderContentTool()}
      <QRCodeCustomizer
        customization={qrCodeData.customization}
        initialData={qrCodeData}
        onCustomizationChange={handleCustomizationChange}
        onComplete={handleSave}
        initialContent={JSON.stringify(qrCodeData.content)}
        initialName={qrCodeData.name}
      />
    </div>
  )
}