import { useState } from 'react'
import QRCode from 'qrcode.react'

interface QRCodeCustomizerProps {
  qrCodeData: string
}

const frames = [
  { id: 'none', name: 'No Frame' },
  { id: 'frame1', name: 'Frame 1' },
  { id: 'frame2', name: 'Frame 2' },
  { id: 'frame3', name: 'Frame 3' },
]

export default function QRCodeCustomizer({ qrCodeData }: QRCodeCustomizerProps) {
  const [logo, setLogo] = useState<string | null>(null)
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [selectedFrame, setSelectedFrame] = useState('none')

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setLogo(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleExport = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'qrcode.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">2. Customize</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <input type="file" onChange={handleLogoUpload} accept="image/*" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Background Color</label>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Frame</label>
        <select
          value={selectedFrame}
          onChange={(e) => setSelectedFrame(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {frames.map((frame) => (
            <option key={frame.id} value={frame.id}>{frame.name}</option>
          ))}
        </select>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center mt-4">
        <QRCode
          value={qrCodeData || "http://qrtraffic.com"}
          size={200}
          fgColor={color}
          bgColor={bgColor}
          level="H"
          imageSettings={logo ? {
            src: logo,
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          } : undefined}
        />
        <p className="mt-2 text-gray-600">Scan Me</p>
      </div>
      <button onClick={handleExport} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">Export</button>
    </div>
  )
}