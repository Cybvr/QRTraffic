import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface FacebookToolProps {
  setQRCodeData: (data: string) => void
}

export default function FacebookTool({ setQRCodeData }: FacebookToolProps) {
  const [facebookUrl, setFacebookUrl] = useState('')

  const handleGenerate = () => {
    setQRCodeData(facebookUrl)
  }

  return (
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
        <Button onClick={handleGenerate} className="w-full">
          Generate QR Code
        </Button>
      </CardContent>
    </Card>
  )
}
