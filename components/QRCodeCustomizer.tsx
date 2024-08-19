import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Image, PaintBucket, Frame } from "lucide-react"

export type CustomizationType = {
  logo?: string;
  color: string;
  bgColor: string;
  frame: string;
}

interface QRCodeCustomizerProps {
  qrCodeData: string;
  customization: CustomizationType;
  onCustomizationChange: (newCustomization: CustomizationType) => void;
}

export default function QRCodeCustomizer({ 
  qrCodeData, 
  customization, 
  onCustomizationChange 
}: QRCodeCustomizerProps) {
  const [localCustomization, setLocalCustomization] = useState<CustomizationType>(customization)

  useEffect(() => {
    setLocalCustomization(customization)
  }, [customization])

  const updateCustomization = (key: keyof CustomizationType, value: string) => {
    const newCustomization = { ...localCustomization, [key]: value }
    setLocalCustomization(newCustomization)
    onCustomizationChange(newCustomization)
  }

  // Dummy function that doesn't actually process files
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Logo upload triggered")
    // In a real implementation, this would process the file and update the logo
    // updateCustomization('logo', processedLogoUrl)
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
          <Input 
            id="color" 
            type="color" 
            value={localCustomization.color} 
            onChange={(e) => updateCustomization('color', e.target.value)} 
          />
        </div>
        <div className="space-y-2 mt-4">
          <Label htmlFor="bgColor">Background Color</Label>
          <Input 
            id="bgColor" 
            type="color" 
            value={localCustomization.bgColor} 
            onChange={(e) => updateCustomization('bgColor', e.target.value)} 
          />
        </div>
      </TabsContent>
      <TabsContent value="frame">
        <p>A quick response code with a frame and call-to-action gets 80% more scans</p>
        {/* Add frame selection options here */}
        <Input 
          type="text" 
          value={localCustomization.frame} 
          onChange={(e) => updateCustomization('frame', e.target.value)}
          placeholder="Enter frame type"
        />
      </TabsContent>
    </Tabs>
  )
}