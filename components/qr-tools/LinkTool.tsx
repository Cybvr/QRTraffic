import { useState } from 'react'

interface LinkToolProps {
  setQRCodeData: (data: string) => void
}

export default function LinkTool({ setQRCodeData }: LinkToolProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleGenerate = () => {
    setQRCodeData(url)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">1. Setup</h2>
      <p className="text-gray-600 mb-4">When scanned, redirects user to specified website URL or content link</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="My QR Code"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">Enter URL</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="http://qrtraffic.com"
          />
        </div>
        <button 
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate QR Code
        </button>
      </div>
    </div>
  )
}