import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface FacebookToolProps {
  setQRCodeData: (data: any) => void
}

export default function FacebookTool({ setQRCodeData }: FacebookToolProps) {
  const [facebookUrl, setFacebookUrl] = useState('')

  const handleGenerate = () => {
    const facebookData = {
      facebookUrl,
      name: 'Facebook Page QR'
    }
    setQRCodeData(facebookData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Setup</CardTitle>
          <CardDescription>Create a QR code for your Facebook page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="url"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            placeholder="Facebook Page URL"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleGenerate}>
            Generate QR Code
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}