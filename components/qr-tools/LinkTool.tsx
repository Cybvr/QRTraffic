import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface LinkToolProps {
  setQRCodeData: (data: string) => void
}

export default function LinkTool({ setQRCodeData }: LinkToolProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleGenerate = () => {
    setQRCodeData(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Setup</CardTitle>
        <CardDescription>When scanned, redirects user to specified website URL or content link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My QR Code"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">Enter URL</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://qrtraffic.com"
          />
        </div>
        <Button onClick={handleGenerate} className="w-full">
          Generate QR Code
        </Button>
      </CardContent>
    </Card>
  )
}