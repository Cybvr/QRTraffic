// File: components/qr-tools/QRCodeTypeSelector.tsx

import { FC } from 'react'
import { Icon } from '@iconify/react'

interface QRCodeType {
  name: string
  icon: string
  description: string
}

const qrCodeTypes: QRCodeType[] = [
  { name: 'Website URL', icon: 'mdi:web', description: 'Link to a website of your choice' },
  { name: 'vCard', icon: 'mdi:card-account-details', description: 'Share your electronic business card' },
  { name: 'PDF', icon: 'mdi:file-pdf-box', description: 'Showcase info in a PDF file' },
  { name: 'Images', icon: 'mdi:image', description: 'Display an image gallery' },
  { name: 'Social Media', icon: 'mdi:share-variant', description: 'Link to all your social media channels' },
  { name: 'Video', icon: 'mdi:video', description: 'Share one or multiple videos' },
  { name: 'Simple Text', icon: 'mdi:text', description: 'Display a body of text' },
  { name: 'Business Page', icon: 'mdi:domain', description: 'Profile your business information' },
  { name: 'Facebook', icon: 'mdi:facebook', description: 'Redirect users to your Facebook page' },
  { name: 'Wi-Fi', icon: 'mdi:wifi', description: 'Connect to a wireless network' },
]

interface Props {
  onSelect: (type: string) => void
}

const QRCodeTypeSelector: FC<Props> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {qrCodeTypes.map((type) => (
        <button
          key={type.name}
          onClick={() => onSelect(type.name)}
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <Icon icon={type.icon} className="text-4xl mb-4 text-blue-500" />
          <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
          <p className="text-sm text-gray-600 text-center">{type.description}</p>
        </button>
      ))}
    </div>
  )
}

export default QRCodeTypeSelector