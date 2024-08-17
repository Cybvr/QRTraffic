import { useState } from 'react'

interface BusinessToolProps {
  setQRCodeData: (data: string) => void
}

export default function BusinessTool({ setQRCodeData }: BusinessToolProps) {
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')

  const handleGenerate = () => {
    const businessData = `${businessName}\n${address}\n${phone}\n${website}`
    setQRCodeData(businessData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">1. Setup</h2>
      <p className="text-gray-600 mb-4">Create a QR code for your business information</p>
      <div className="space-y-4">
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website"
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