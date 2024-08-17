import { useState } from 'react'

interface WiFiToolProps {
  setQRCodeData: (data: string) => void
}

export default function WiFiTool({ setQRCodeData }: WiFiToolProps) {
  const [ssid, setSSID] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA')

  const handleGenerate = () => {
    const wifiData = `WIFI:S:${ssid};T:${encryption};P:${password};;`
    setQRCodeData(wifiData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">1. Setup</h2>
      <p className="text-gray-600 mb-4">Create a QR code for WiFi access</p>
      <div className="space-y-4">
        <input
          type="text"
          value={ssid}
          onChange={(e) => setSSID(e.target.value)}
          placeholder="Network Name (SSID)"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Encryption</option>
        </select>
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