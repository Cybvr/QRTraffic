import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Image, PaintBucket, Frame } from "lucide-react"

interface QRCodeCustomizerProps {
  qrCodeData: string
}

export default function QRCodeCustomizer({ qrCodeData }: QRCodeCustomizerProps) {
  const [logo, setLogo] = useState<string | null>(null)
  const [color, setColor] = useState('#4F46E5')
  const [bgColor, setBgColor] = useState('#ffffff')

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setLogo(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <Tabs defaultValue="logo">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="logo"><Image className="mr-2" />Logo</TabsTrigger>
        <TabsTrigger value="colors"><PaintBucket className="mr-2" />Colors</TabsTrigger>
        <TabsTrigger value="frame"><Frame className="mr-2" />Frame</TabsTrigger>
      </TabsList>
      <TabsContent value="logo">
        <p>With this QR code generator with logo, you can easily add your logo for stronger brand recall (300 × 300px, 72dpi)</p>
        <div className="border-2 border-dashed border-gray-300 p-4 text-center mt-4">
          <Label htmlFor="logo-upload" className="cursor-pointer">
            Click to upload or drag and drop
            <br />
            SVG, PNG, JPG or GIF (max. 800x400px)
          </Label>
          <Input id="logo-upload" type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
        </div>
      </TabsContent>
      <TabsContent value="colors">
        <p>Embellish your customized QR with your brand colors</p>
        <div className="space-y-2 mt-4">
          <Label htmlFor="color">Foreground Color</Label>
          <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="space-y-2 mt-4">
          <Label htmlFor="bgColor">Background Color</Label>
          <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>
      </TabsContent>
      <TabsContent value="frame">
        <p>A quick response code with a frame and call-to-action gets 80% more scans</p>
        {/* Add frame selection options here */}
      </TabsContent>
    </Tabs>
  )
}