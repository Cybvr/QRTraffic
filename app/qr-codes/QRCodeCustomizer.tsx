// File: components/qr-tools/QRCodeCustomizer.tsx

import { FC, useState } from 'react'
import { SketchPicker } from 'react-color'
import QRCode from 'qrcode.react'

interface Props {
  onComplete: (customization: any) => void
}

const QRCodeCustomizer: FC<Props> = ({ onComplete }) => {
  const [customization, setCustomization] = useState({
    fgColor: '#000000',
    bgColor: '#ffffff',
    includeImage: false,
    imageUrl: '',
  })

  const handleColorChange = (color: any, type: 'fgColor' | 'bgColor') => {
    setCustomization({ ...customization, [type]: color.hex })
  }

  const handleImageToggle = () => {
    setCustomization({ ...customization, includeImage: !customization.includeImage })
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomization({ ...customization, imageUrl: e.target.value })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Customize QR Code</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Foreground Color</h3>
            <SketchPicker color={customization.fgColor} onChange={(color) => handleColorChange(color, 'fgColor')} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Background Color</h3>
            <SketchPicker color={customization.bgColor} onChange={(color) => handleColorChange(color, 'bgColor')} />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={customization.includeImage}
                onChange={handleImageToggle}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Include Logo</span>
            </label>
            {customization.includeImage && (
              <input
                type="text"
                value={customization.imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Enter logo URL"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg">
          <QRCode
            value="https://example.com"
            size={200}
            fgColor={customization.fgColor}
            bgColor={customization.bgColor}
            imageSettings={customization.includeImage ? { src: customization.imageUrl, excavate: true, width: 40, height: 40 } : undefined}
          />
        </div>
      </div>
      <button
        onClick={() => onComplete(customization)}
        className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Finish
      </button>
    </div>
  )
}

export default QRCodeCustomizer