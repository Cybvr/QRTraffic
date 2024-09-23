import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Globe, User, UtensilsCrossed, Facebook, Briefcase, Wifi } from 'lucide-react'

interface QRCodeType {
  name: string
  icon: React.ElementType
  description: string
}

const qrCodeTypes: QRCodeType[] = [
  { name: 'Link', icon: Globe, description: 'Instantly Connect Your Audience to Any Web Page' },
  { name: 'VCard', icon: User, description: 'Share Contact Information with a Single Scan' },
  { name: 'Restaurants Menu', icon: UtensilsCrossed, description: 'Offer Contactless Dining Experiences' },
  { name: 'Facebook', icon: Facebook, description: 'Boost Your Facebook Presence' },
  { name: 'Business Page', icon: Briefcase, description: 'Streamline Customer Engagement' },
  { name: 'WiFi', icon: Wifi, description: 'Share WiFi Access Securely and Easily' },
]

interface Props {
  onSelect: (type: string) => void
}

const QRCodeTypeSelector: React.FC<Props> = ({ onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {qrCodeTypes.map((type) => (
      <Card 
        key={type.name} 
        className="hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer group"
        onClick={() => onSelect(type.name)}
      >
        <CardHeader className="space-y-2">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
            <type.icon className="w-6 h-6 text-blue-500" />
          </div>
          <CardTitle className="text-lg font-semibold text-gray-900">{type.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">{type.description}</CardDescription>
        </CardHeader>
      </Card>
    ))}
  </div>
)

export default QRCodeTypeSelector