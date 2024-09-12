'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { getQRCode } from '@/services/qrCodeService'

interface InitialData {
  id?: string;
  url?: string;
}

const defaultCustomization = {
  frame: 'no-frame',
  frameUrl: '',
  frameColor: '#000000',
  frameText: 'Scan me!',
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  qrCodeColor: '#000000',
  transparentBackground: false,
  logo: '',
}

const frames = [
  { thumb: '/images/frames/thumb1.png', full: '/images/frames/frame1.png' },
  { thumb: '/images/frames/thumb2.png', full: '/images/frames/frame2.png' },
  { thumb: '/images/frames/thumb3.png', full: '/images/frames/frame3.png' },
  { thumb: '/images/frames/thumb4.png', full: '/images/frames/frame4.png' },
  { thumb: '/images/frames/thumb5.png', full: '/images/frames/frame5.png' },
  { thumb: '/images/frames/thumb6.png', full: '/images/frames/frame6.png' },
]

const socialLogos = ['Facebook.png', 'Instagram.png', 'Linkedin.png', 'Snapchat.png', 'Tiktok.png', 'X.png', 'Youtube.png']

const DEFAULT_QR_URL = 'https://qrtraffic.com/welcome'

export default function QRCodeCustomizer({
  initialData = {} as InitialData,
  customization = defaultCustomization,
  onCustomizationChange,
  onComplete,
  initialContent,
  initialName
}) {
  const [localCustomization, setLocalCustomization] = useState(customization)
  const [error, setError] = useState<string | null>(null)
  const [scanCount, setScanCount] = useState(0)

  useEffect(() => {
    const fetchScanCount = async () => {
      if (initialData.id) {
        try {
          const qrCodeData = await getQRCode(initialData.id)
          setScanCount(qrCodeData.scanCount)
        } catch (error) {
          console.error('Error fetching QR code data:', error)
        }
      }
    }

    fetchScanCount()
  }, [initialData.id])

  const handleChange = useCallback((key, value) => {
    const newCustomization = { ...localCustomization, [key]: value }
    setLocalCustomization(newCustomization)
    onCustomizationChange(newCustomization)
  }, [localCustomization, onCustomizationChange])

  const handleLogoUpload = useCallback((file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          handleChange('logo', e.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }, [handleChange])

  const handleSaveAsJpeg = async () => {
    const qrCodeElement = document.querySelector('.qr-code-preview') as HTMLElement;
    if (!qrCodeElement) return;
    try {
      const canvas = await html2canvas(qrCodeElement);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'qr-code.jpeg';
      link.click();
    } catch (error) {
      console.error('Error generating JPEG:', error);
    }
  };

  const validateQRCodeData = (data) => {
    const requiredFields = ['frame', 'frameText', 'frameColor', 'backgroundColor', 'textColor', 'qrCodeColor', 'logo', 'transparentBackground', 'frameUrl']
    return requiredFields.every(field => data[field] !== undefined)
  }

  const handleComplete = () => {
    if (!validateQRCodeData(localCustomization)) {
      setError('Invalid QR code data. Please fill all required fields.')
      return
    }
    setError(null)
    onComplete()
  }

  const getQRCodeValue = () => {
    return initialContent || initialData.url || DEFAULT_QR_URL
  }

  return (
    <div className="pt-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="frame" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="frame">Frame</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="logo">Logo</TabsTrigger>
                </TabsList>
                <TabsContent value="frame" className="space-y-4">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {frames.map((frame, index) => (
                      <div
                        key={index}
                        className={`border rounded-md p-1 cursor-pointer transition-all ${localCustomization.frameUrl === frame.full ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
                        onClick={() => handleChange('frameUrl', frame.full)}
                      >
                        <Image src={frame.thumb} alt={`Frame ${index + 1}`} width={48} height={72} className="w-full h-18 object-cover rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frameText">Frame Text</Label>
                    <Input
                      id="frameText"
                      value={localCustomization.frameText}
                      onChange={(e) => handleChange('frameText', e.target.value)}
                      placeholder="Scan me!"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="colors" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backgroundColor">Background</Label>
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={localCustomization.backgroundColor}
                        onChange={(e) => handleChange('backgroundColor', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="textColor">Text</Label>
                      <Input
                        id="textColor"
                        type="color"
                        value={localCustomization.textColor}
                        onChange={(e) => handleChange('textColor', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qrCodeColor">QR Code</Label>
                      <Input
                        id="qrCodeColor"
                        type="color"
                        value={localCustomization.qrCodeColor}
                        onChange={(e) => handleChange('qrCodeColor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="transparentBackground"
                      checked={localCustomization.transparentBackground}
                      onCheckedChange={(checked) => handleChange('transparentBackground', checked)}
                    />
                    <Label htmlFor="transparentBackground">Transparent background</Label>
                  </div>
                </TabsContent>
                <TabsContent value="logo" className="space-y-4">
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {socialLogos.map((logo) => (
                      <div
                        key={logo}
                        className={`border rounded-md p-1 cursor-pointer transition-all ${localCustomization.logo === `/images/Socials/${logo}` ? 'ring-2 ring-primary' : 'hover:bg-accent'}`}
                        onClick={() => handleChange('logo', `/images/Socials/${logo}`)}
                      >
                        <Image src={`/images/Socials/${logo}`} alt={logo} width={48} height={48} className="w-full h-12 object-cover rounded" />
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Upload Your Own Logo</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors hover:border-primary">
                      <Input
                        id="logo-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])}
                        accept="image/*"
                      />
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                      </Label>
                    </div>
                  </div>
                  {localCustomization.logo && (
                    <div className="flex items-center justify-between p-2 border rounded-lg">
                      <Image src={localCustomization.logo} alt="Uploaded logo" width={100} height={50} className="max-h-12 w-auto" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleChange('logo', '')}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3 space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center space-y-4">
              <div className="bg-white rounded-lg relative qr-code-preview" style={{ width: '300px', height: '300px', overflow: 'hidden' }}>
                {localCustomization.frameUrl && (
                  <Image
                    src={localCustomization.frameUrl}
                    alt="QR Code Frame"
                    width={300}
                    height={300}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <QRCode
                    value={getQRCodeValue()}
                    size={180}
                    fgColor={localCustomization.qrCodeColor}
                    bgColor={localCustomization.transparentBackground ? 'transparent' : localCustomization.backgroundColor}
                    level="H"
                    imageSettings={localCustomization.logo ? { src: localCustomization.logo, excavate: true, width: 30, height: 30 } : undefined}
                  />
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-lg font-bold" style={{ color: localCustomization.textColor }}>{localCustomization.frameText}</p>
              </div>
              <p className="text-sm text-muted-foreground">Scans: {scanCount}</p>
              <div className="w-full space-y-2">
                <Button variant="default" onClick={handleSaveAsJpeg} className="w-full">Save as JPEG</Button>
                <Button variant="default" onClick={handleComplete} className="w-full">Complete Customization</Button>
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}