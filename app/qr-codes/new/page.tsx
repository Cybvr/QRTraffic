// File: /app/qr-codes/new/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createQRCode } from '@/services/qrCodeService'
import QRCodeTypeSelector from '../QRCodeTypeSelector'
import QRCodeContentForm from '../QRCodeContentForm'
import QRCodeCustomizer from '../QRCodeCustomizer'
import ProgressSteps from '@/components/common/ProgressSteps'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = ['Choose QR Code Type', 'Add Content', 'Customize Design']

export default function NewQRCode() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedType, setSelectedType] = useState('')
  const [qrCodeData, setQRCodeData] = useState<any>({})
  const [customization, setCustomization] = useState({
    frame: 'no-frame',
    frameUrl: '',
    frameColor: '#000000',
    frameText: 'Scan me!',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    transparentBackground: false,
    logo: '',
    customLogo: ''
  })
  const { user } = useAuth()
  const router = useRouter()

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setCurrentStep(1)
  }

  const handleContentSubmit = (data: any) => {
    setQRCodeData(data)
    setCurrentStep(2)
  }

  const handleCustomizationChange = (newCustomization: any) => {
    setCustomization(newCustomization)
  }

  const handleCustomizationComplete = async () => {
    if (!user) {
      // Handle unauthenticated user
      return
    }
    try {
      const qrCodeId = await createQRCode(user.uid, {
        type: selectedType,
        content: qrCodeData,
        customization
      })
      router.push(`/qr-codes/${qrCodeId}`)
    } catch (error) {
      console.error('Error creating QR code:', error)
      // Handle error (show error message to user)
    }
  }

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <QRCodeTypeSelector onSelect={handleTypeSelect} />
      case 1:
        return <QRCodeContentForm type={selectedType} onSubmit={handleContentSubmit} />
      case 2:
        return (
          <QRCodeCustomizer
            initialData={qrCodeData}
            customization={customization}
            onCustomizationChange={handleCustomizationChange}
            onComplete={handleCustomizationComplete}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <ProgressSteps steps={steps} currentStep={currentStep}/>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold mb-6">
            {currentStep === 0
              ? steps[0]
              : currentStep === 1
              ? steps[1]
              : steps[2]}
          </h1>
          {renderContent()}
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