// File: app/qr-codes/new/page.tsx

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
  const [qrCodeData, setQRCodeData] = useState({
    type: '',
    content: '',
    name: '',
    customization: {
      frame: 'no-frame',
      frameUrl: '',  // Ensure frameUrl is always included
      frameText: 'Scan me!',
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

  const handleTypeSelect = (type: string) => {
    setQRCodeData(prev => ({ ...prev, type }))
    setCurrentStep(1)
  }

  const handleContentSubmit = (data: any) => {
    setQRCodeData(prev => ({ ...prev, ...data }))
    setCurrentStep(2)
  }

  const handleCustomizationChange = (customization: any) => {
    setQRCodeData(prev => ({ ...prev, customization }))
  }

  const handleCustomizationComplete = async () => {
    if (!user) return
    try {
      const qrCodeId = await createQRCode(user.uid, qrCodeData)
      router.push(`/qr-codes/my-codes`)  // Redirect to My Codes after creation
    } catch (error) {
      console.error('Error creating QR code:', error)
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
      <Card className="mb-8">
        <CardContent className="pt-6">
          <ProgressSteps steps={steps} currentStep={currentStep}/>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold mb-6">{steps[currentStep]}</h1>
          {renderContent()}
          {currentStep === 2 && (
            <Button
              onClick={handleCustomizationComplete}
<<<<<<< HEAD
              variant="default"  // Corrected variant
=======
              variant="solid"
>>>>>>> 3d9f1ebde7398490cbfe7bc0a20a2014f4c00574
              className="w-full mt-4"
            >
              Save and Continue
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

 
