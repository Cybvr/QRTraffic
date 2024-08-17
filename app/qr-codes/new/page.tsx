"use client"
import { useState, useRef, useEffect } from 'react'
import { LinkIcon, UserIcon, Square3Stack3DIcon, BuildingOfficeIcon, WifiIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import LinkTool from '@/components/qr-tools/LinkTool'
import VCardTool from '@/components/qr-tools/VCardTool'
import MenuTool from '@/components/qr-tools/MenuTool'
import FacebookTool from '@/components/qr-tools/FacebookTool'
import BusinessTool from '@/components/qr-tools/BusinessTool'
import WiFiTool from '@/components/qr-tools/WiFiTool'
import QRCodeDisplay from '@/components/qr-tools/QRCodeDisplay'

const tools = [
  { name: 'Link', icon: LinkIcon, component: LinkTool },
  { name: 'VCard', icon: UserIcon, component: VCardTool },
  { name: 'Menu', icon: Square3Stack3DIcon, component: MenuTool },
  { name: 'Facebook', icon: GlobeAltIcon, component: FacebookTool },
  { name: 'Business', icon: BuildingOfficeIcon, component: BusinessTool },
  { name: 'WiFi', icon: WifiIcon, component: WiFiTool },
]

export default function NewQRCode() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [qrCodeData, setQRCodeData] = useState<string>('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        const isScrollable = scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
        scrollContainerRef.current.style.justifyContent = isScrollable ? 'flex-start' : 'space-between'
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderSelectedTool = () => {
    const tool = tools.find(t => t.name === selectedTool)
    if (tool) {
      const ToolComponent = tool.component
      return <ToolComponent setQRCodeData={setQRCodeData} />
    }
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold mb-2">Create New QR Code</h1>
      <p className="text-gray-400 font-light mb-4">Select a tool to get started</p>

      <div className="mb-6 bg-white rounded-lg overflow-x-auto">
        <div 
          ref={scrollContainerRef}
          className="flex whitespace-nowrap"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => setSelectedTool(tool.name)}
              className={`inline-flex items-center px-4 py-3 text-sm flex-shrink-0 ${
                selectedTool === tool.name 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              <tool.icon className="h-5 w-5 mr-2" />
              {tool.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {selectedTool ? (
            renderSelectedTool()
          ) : (
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Select a Tool</h2>
              <p className="text-gray-500 font-light">Choose a tool from above to start creating your QR code.</p>
            </div>
          )}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <QRCodeDisplay qrCode={qrCodeData} />
        </div>
      </div>
    </div>
  )
}