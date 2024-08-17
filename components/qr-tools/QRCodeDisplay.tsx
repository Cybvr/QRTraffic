import React from 'react'
import Image from 'next/image'

interface QRCodeDisplayProps {
  qrCode: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCode }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your QR Code:</h2>
      {/* For now, we'll just display the URL. In a real app, this would be an actual QR code image */}
      <div className="border p-4 inline-block">
        <p>{qrCode}</p>
      </div>
    </div>
  )
}

export default QRCodeDisplay