import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Image as ImageIcon, PaintBucket, Frame } from "lucide-react"

export type CustomizationType = {
  logo?: string;
  color: string;
  bgColor: string;
  frame: string;
}

interface QRCodeCustomizerProps {
  customization: CustomizationType;
  onCustomizationChange: (newCustomization: CustomizationType) => void;
}

export default function QRCodeCustomizer({ 
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

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          updateCustomization('logo', base64String)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error processing logo:', error)
      }
    }
  }

  return (
    <Tabs defaultValue="logo">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="logo"><ImageIcon className="mr-2" />Logo</TabsTrigger>
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
        {localCustomization.logo && (
          <div className="mt-4">
            <p>Uploaded Logo:</p>
            <img src={localCustomization.logo} alt="Uploaded logo" className="max-w-full h-auto" />
          </div>
        )}
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