'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createQRCode } from '@/services/qrCodeService'
import QRCodeTypeSelector from '@/app/dashboard/common/QRCodeTypeSelector'
import QRCodeCustomizer from '@/app/dashboard/common/QRCodeCustomizer'
import ProgressSteps from '@/app/dashboard/common/ProgressSteps'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LinkTool from '../qr-tools/LinkTool'
import VCardTool from '../qr-tools/VCardTool'
import MenuTool from '../qr-tools/MenuTool'
import FacebookTool from '../qr-tools/FacebookTool'
import BusinessTool from '../qr-tools/BusinessTool'
import WiFiTool from '../qr-tools/WiFiTool'

const steps = ['Choose QR Code Type', 'Add Content', 'Customize Design']

export default function NewQRCode() {
  const [currentStep, setCurrentStep] = useState(0)
  const [qrCodeData, setQRCodeData] = useState({
    type: '',
    content: {},
    name: '',
    customization: {
      frame: 'no-frame',
      frameUrl: '',
      frameText: 'Scan Me!',
      frameColor: '#000000',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      qrCodeColor: '#000000',
      transparentBackground: false,
      logo: '',
      customLogo: ''
    }
  })
  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTypeSelect = (type: string) => {
    setQRCodeData(prev => ({ ...prev, type }))
    setCurrentStep(1)
  }

  const handleContentUpdate = (data: any) => {
    setQRCodeData(prev => ({
      ...prev,
      content: data,
      name: data.name || prev.name
    }))
    setCurrentStep(prevStep => prevStep + 1) // This line automatically moves to the next step
  }

  const handleCustomizationChange = (customization: any) => {
    setQRCodeData(prev => ({ ...prev, customization }))
  }

  const validateQRCodeData = (data: typeof qrCodeData): boolean => {
    return !!(data.type && Object.keys(data.content).length > 0 && data.name);
  }

  const handleCustomizationComplete = async () => {
    if (!user) {
      setError('User not authenticated. Please log in and try again.')
      return
    }
    if (!validateQRCodeData(qrCodeData)) {
      setError('Invalid QR code data. Please fill all required fields.')
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      await createQRCode(user.uid, qrCodeData)
      router.push(`/dashboard/qr-codes/my-codes`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create QR code. Please try again.')
    } finally {
      setIsLoading(false)
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

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <QRCodeTypeSelector onSelect={handleTypeSelect} />
      case 1:
        return renderContentTool()
      case 2:
        return (
          <QRCodeCustomizer
            customization={qrCodeData.customization}
            initialData={qrCodeData.content}
            onCustomizationChange={handleCustomizationChange}
            onComplete={handleCustomizationComplete}
            initialContent={JSON.stringify(qrCodeData.content)}
            initialName={qrCodeData.name}
          />
        )
      default:
        return null
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProgressSteps steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

      <Card className="mt-4">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold mb-6">{steps[currentStep]}</h1>
          {renderContent()}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {currentStep === 2 && (
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleCustomizationComplete}
                variant="default"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Save and Continue'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}