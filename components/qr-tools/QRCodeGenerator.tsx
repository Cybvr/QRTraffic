import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QRCodeGeneratorProps {
  onGenerate: (url: string) => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ onGenerate }) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(url)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            required
          />
          <Button type="submit" className="w-full">Generate QR Code</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default QRCodeGenerator