// File: app/qr-codes/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext' // Assuming you have this
import { createQRCode } from '@/services/qrCodeService'
import QRCodeTypeSelector from '../QRCodeTypeSelector'
import QRCodeContentForm from '../QRCodeContentForm'
import QRCodeCustomizer from '../QRCodeCustomizer'
import ProgressSteps from '@/components/common/ProgressSteps'

const steps = ['Choose QR Code Type', 'Add Content', 'Customize Design']

export default function NewQRCode() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedType, setSelectedType] = useState('')
  const [qrCodeData, setQRCodeData] = useState<any>({})
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

  const handleCustomizationComplete = async (customization: any) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressSteps steps={steps} currentStep={currentStep} />
      <div className="mt-8">
        {currentStep === 0 && <QRCodeTypeSelector onSelect={handleTypeSelect} />}
        {currentStep === 1 && <QRCodeContentForm type={selectedType} onSubmit={handleContentSubmit} />}
        {currentStep === 2 && <QRCodeCustomizer onComplete={handleCustomizationComplete} />}
      </div>
    </div>
  )
}