import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import QRCode from 'qrcode.react'
import { Button } from "@/components/ui/button" // Add this import

interface QRCodeDisplayProps {
  qrCode: string;
  customization: any;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode, customization }) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="border p-4 inline-block">
          {qrCode ? (
            <QRCode 
              id="qr-code"
              value={qrCode} 
              size={200}
              fgColor={customization.color}
              bgColor={customization.bgColor}
              // Add other customization props as needed
            />
          ) : (
            <p className="text-gray-400">Generate a QR code to see it here</p>
          )}
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">Scan Me</p>
        {qrCode && (
          <Button onClick={downloadQRCode} className="mt-4 w-full">
            Download QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default QRCodeDisplay