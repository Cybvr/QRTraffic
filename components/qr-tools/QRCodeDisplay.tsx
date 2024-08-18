import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import QRCode from 'qrcode.react'

interface QRCodeDisplayProps {
  qrCode: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Yourz QR Code:</h2>
        <div className="border p-4 inline-block">
          {qrCode ? (
            <QRCode value={qrCode} size={200} />
          ) : (
            <p className="text-gray-400">Generate a QR code to see it here</p>
          )}
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">Scan Me</p>
      </CardContent>
    </Card>
  )
}

export default QRCodeDisplay