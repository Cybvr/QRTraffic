import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface LinkToolProps {
  setQRCodeData: (data: any) => void
}

const LinkTool: React.FC<LinkToolProps> = ({ setQRCodeData }) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const handleGenerate = () => {
    setQRCodeData({
      name,
      content: { url }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link QR Code</CardTitle>
        <CardDescription>When scanned, redirects user to specified website URL or content link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">QR Code Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Link QR Code"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">Enter URL</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleGenerate}>
          Generate QR Code
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LinkTool