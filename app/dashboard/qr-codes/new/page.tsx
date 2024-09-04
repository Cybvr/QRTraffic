'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createQRCode } from '@/services/qrCodeService'
import QRCodeTypeSelector from '../QRCodeTypeSelector'
import QRCodeContentForm from '../QRCodeContentForm'
import QRCodeCustomizer from '../QRCodeCustomizer'
import ProgressSteps from '../ProgressSteps'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = ['Choose QR Code Type', 'Add Content', 'Customize Design']

export default function NewQRCode() {
  const [currentStep, setCurrentStep] = useState(0)
  const [qrCodeData, setQRCodeData] = useState({
    type: '',
    content: '',
    name: '',
    customization: {
      frame: 'no-frame',
      frameUrl: '',
      frameText: 'Scan Me!', // Default frame text
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
    console.log('Selected QR Code type:', type)
    setQRCodeData(prev => ({ ...prev, type }))
    setCurrentStep(1)
  }

  const handleContentSubmit = (data: any) => {
    console.log('Content form data:', data)
    setQRCodeData(prev => ({
      ...prev,
      content: data.url,
      name: data.name
    }))
    setCurrentStep(2)
  }

  const handleCustomizationChange = (customization: any) => {
    console.log('Customization data:', customization)
    setQRCodeData(prev => ({ ...prev, customization }))
  }

  const validateQRCodeData = (data: typeof qrCodeData): boolean => {
    const { type, content, name, customization } = data;
    const isValid = !!(
      type && content && name &&
      customization.frame &&
      customization.frameColor &&
      customization.frameText &&
      customization.backgroundColor &&
      customization.textColor &&
      customization.qrCodeColor &&
      typeof customization.transparentBackground === 'boolean' &&
      customization.frameUrl !== undefined
    );
    console.log('QR Code data validation result:', isValid)
    return isValid;
  }

  const handleCustomizationComplete = async () => {
    if (!user) {
      setError('User not authenticated. Please log in and try again.')
      return
    }
    console.log('QR Code data before validation:', qrCodeData)
    if (!validateQRCodeData(qrCodeData)) {
      setError('Invalid QR code data. Please fill all required fields.')
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      console.log('Creating QR code with data:', qrCodeData)
      await createQRCode(user.uid, qrCodeData)
      console.log('QR code created successfully')
      router.push(`/dashboard/qr-codes/my-codes`)
    } catch (error) {
      console.error('Error creating QR code:', error)
      setError(error instanceof Error ? error.message : 'Failed to create QR code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <QRCodeTypeSelector onSelect={handleTypeSelect} />
      case 1:
        return <QRCodeContentForm type={qrCodeData.type} onSubmit={handleContentSubmit} />
      case 2:
        return (
          <QRCodeCustomizer
            customization={qrCodeData.customization}
            initialData={{ url: qrCodeData.content }}
            onCustomizationChange={handleCustomizationChange}
            onComplete={handleCustomizationComplete}
            initialContent={qrCodeData.content}
            initialName={qrCodeData.name}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProgressSteps steps={steps} currentStep={currentStep} />

      <Card className="mb-8 mt-4">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold mb-6">{steps[currentStep]}</h1>
          {renderContent()}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {currentStep === 2 && (
            <Button
              onClick={handleCustomizationComplete}
              variant="default"
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Save and Continue'}
            </Button>
          )}
        </CardContent>
      </Card>
      {currentStep > 0 && (
        <Button
          onClick={() => setCurrentStep(prev => prev - 1)}
          variant="outline"
          className="w-full mt-2"
        >
          Back
        </Button>
      )}
    </div>
  )
}