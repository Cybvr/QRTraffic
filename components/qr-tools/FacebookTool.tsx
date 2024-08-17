import { useState } from 'react'

interface FacebookToolProps {
  setQRCodeData: (data: string) => void
}

export default function FacebookTool({ setQRCodeData }: FacebookToolProps) {
  const [facebookUrl, setFacebookUrl] = useState('')

  const handleGenerate = () => {
    setQRCodeData(facebookUrl)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">1. Setup</h2>
      <p className="text-gray-600 mb-4">Create a QR code for your Facebook page</p>
      <div className="space-y-4">
        <input
          type="url"
          value={facebookUrl}
          onChange={(e) => setFacebookUrl(e.target.value)}
          placeholder="Facebook Page URL"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button 
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Generate QR Code
        </button>
      </div>
    </div>
  )
}