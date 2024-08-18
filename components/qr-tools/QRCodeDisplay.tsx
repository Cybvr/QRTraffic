import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface QRCodeDisplayProps {
  qrCode: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Your QR Code:</h2>
        <div className="border p-4 inline-block">
          <p>{qrCode}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default QRCodeDisplay