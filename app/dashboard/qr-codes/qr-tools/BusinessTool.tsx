import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface BusinessToolProps {
  setQRCodeData: (data: string) => void
}

export default function BusinessTool({ setQRCodeData }: BusinessToolProps) {
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [qrCodeData, setLocalQRCodeData] = useState('')

  const handleGenerate = () => {
    const businessData = `${businessName}\n${address}\n${phone}\n${website}`
    setLocalQRCodeData(businessData)
    setQRCodeData(businessData)
  }

  return (
    <div className="flex gap-6">
      <div className="flex-grow space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Setup</CardTitle>
            <CardDescription>Create a QR code for your business information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Business Name"
            />
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <Input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website"
            />
            <Button onClick={handleGenerate} className="w-full">
              Generate QR Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}