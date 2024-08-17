import { useState } from 'react'

interface MenuToolProps {
  setQRCodeData: (data: string) => void
}

export default function MenuTool({ setQRCodeData }: MenuToolProps) {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuUrl, setMenuUrl] = useState('')

  const handleGenerate = () => {
    const menuData = `${restaurantName}\n${menuUrl}`
    setQRCodeData(menuData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">1. Setup</h2>
      <p className="text-gray-600 mb-4">Create a QR code for your restaurant menu</p>
      <div className="space-y-4">
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Restaurant Name"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="url"
          value={menuUrl}
          onChange={(e) => setMenuUrl(e.target.value)}
          placeholder="Menu URL"
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