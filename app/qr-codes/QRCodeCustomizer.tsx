// File: app/qr-codes/QRCodeCustomizer.tsx
import React, { FC, useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { Upload, X } from 'lucide-react';

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
  customLogo: ''
};

interface Props {
  initialData?: { url?: string };
  customization?: typeof defaultCustomization;
  onCustomizationChange: (customization: any) => void;
  onComplete: () => void;
  initialContent?: string;
  initialName?: string;
}

const QRCodeCustomizer: FC<Props> = ({ 
  initialData = {}, 
  customization = defaultCustomization, 
  onCustomizationChange, 
  onComplete,
  initialContent,
  initialName 
}) => {
  const [localCustomization, setLocalCustomization] = useState(customization);
  const [dragActive, setDragActive] = useState(false);

  const frames = [
    { thumb: '/images/frames/thumb1.png', full: '/images/frames/frame1.png' },
    { thumb: '/images/frames/thumb2.png', full: '/images/frames/frame2.png' },
    { thumb: '/images/frames/thumb3.png', full: '/images/frames/frame3.png' },
    { thumb: '/images/frames/thumb4.png', full: '/images/frames/frame4.png' },
    { thumb: '/images/frames/thumb5.png', full: '/images/frames/frame5.png' },
    { thumb: '/images/frames/thumb6.png', full: '/images/frames/frame6.png' },
  ];

  useEffect(() => {
    setLocalCustomization(customization);
  }, [customization]);

  const handleChange = (key: string, value: any) => {
    const newCustomization = { ...localCustomization, [key]: value };
    setLocalCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handleFrameSelection = (frameUrl: string) => {
    handleChange('frameUrl', frameUrl);
  };

  const handleLogoUpload = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleChange('logo', result);
      };
      reader.readAsDataURL(file);
    }
  }, [handleChange]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragleave' || e.type === 'dragover') {
      setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    } else if (e.type === 'drop') {
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleLogoUpload(e.dataTransfer.files[0]);
      }
    }
  };

  const handleSaveAsJpeg = async () => {
    const qrCodeElement = document.querySelector('.qr-code-preview');
    if (!qrCodeElement) return;

    try {
      const canvas = await html2canvas(qrCodeElement as HTMLElement);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'qr-code.jpeg';
      link.click();
    } catch (error) {
      console.error('Error generating JPEG:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="w-full md:w-2/3 space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">QR Code Frame</h3>
            <div className="grid grid-cols-6 gap-2 mb-2">
              {frames.map((frame, index) => (
                <div
                  key={index}
                  className={`border p-2 cursor-pointer ${localCustomization.frameUrl === frame.full ? 'border-blue-500' : 'border-gray-300'}`}
                  onClick={() => handleFrameSelection(frame.full)}
                >
                  <img src={frame.thumb} alt={`Frame ${index + 1}`} className="w-full h-18 object-cover" />
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="frameText">Frame Text</Label>
              <Input
                id="frameText"
                value={localCustomization.frameText}
                onChange={(e) => handleChange('frameText', e.target.value)}
                placeholder="Scan me!"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <div>
                <Label htmlFor="backgroundColor">Background color</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={localCustomization.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="textColor">Text color</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={localCustomization.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="qrCodeColor">QR Code color</Label>
                <Input
                  id="qrCodeColor"
                  type="color"
                  value={localCustomization.qrCodeColor}
                  onChange={(e) => handleChange('qrCodeColor', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="transparentBackground"
                checked={localCustomization.transparentBackground}
                onCheckedChange={(checked) => handleChange('transparentBackground', checked)}
              />
              <Label htmlFor="transparentBackground" className="ml-2">Transparent background</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Add Logo</h3>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <h4 className="text-sm font-medium mb-2">Social Media Logos</h4>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['Facebook.png', 'Instagram.png', 'Linkedin.png', 'Snapchat.png', 'Tiktok.png', 'X.png', 'Youtube.png'].map((logo) => (
                    <div
                      key={logo}
                      className={`border p-2 cursor-pointer ${localCustomization.logo === `/images/Socials/${logo}` ? 'border-blue-500' : 'border-gray-300'}`}
                      onClick={() => handleChange('logo', `/images/Socials/${logo}`)}
                    >
                      <img src={`/images/Socials/${logo}`} alt={logo} className="w-full h-12 object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Upload Your Own Logo</h4>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Input
                    id="logo-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])}
                    accept="image/*"
                  />
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </Label>
                </div>
              </div>
            </div>
            {localCustomization.logo && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Uploaded Logo:</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleChange('logo', '')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 border rounded-lg p-2">
                  <img src={localCustomization.logo} alt="Uploaded logo" className="max-w-full h-auto max-h-32 mx-auto" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="w-full md:w-1/3 mt-4 md:mt-0">
        <Card>
          <CardContent className="p-4">
            <div className="bg-white rounded-lg mb-4 relative qr-code-preview" style={{ width: '300px', height: '300px', overflow: 'hidden' }}>
              {localCustomization.frameUrl && (
                <img 
                  src={localCustomization.frameUrl} 
                  alt="QR Code Frame" 
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <QRCode
                  value={initialContent || initialData.url || "https://example.com"}
                  size={180}
                  fgColor={localCustomization.qrCodeColor}
                  bgColor={localCustomization.transparentBackground ? 'transparent' : localCustomization.backgroundColor}
                  level="H"
                  imageSettings={localCustomization.logo ? { src: localCustomization.logo, excavate: true, width: 30, height: 30 } : undefined}
                />
              </div>
              <p className="absolute bottom-2 left-0 right-0 text-center text-sm" style={{ color: localCustomization.textColor }}>{localCustomization.frameText}</p>
            </div>
            <Button onClick={handleSaveAsJpeg} className="w-full">
              Save as JPEG
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeCustomizer;