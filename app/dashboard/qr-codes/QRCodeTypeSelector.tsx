import { FC } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Globe, User, Briefcase, Facebook, Wifi } from 'lucide-react'

interface QRCodeType {
  name: string
  icon: FC<React.SVGProps<SVGSVGElement>>
  description: string
}

const qrCodeTypes: QRCodeType[] = [
  { name: 'Website URL', icon: Globe, description: 'Link to a website of your choice' },
  { name: 'vCard', icon: User, description: 'Share your electronic business card' },
  { name: 'Business Page', icon: Briefcase, description: 'Profile your business information' },
  { name: 'Facebook', icon: Facebook, description: 'Redirect users to your Facebook page' },
  { name: 'Wi-Fi', icon: Wifi, description: 'Connect to a wireless network' },
  { name: 'Restaurant Menu', icon: User, description: 'Display your restaurant menu' },  // Added this back
]

interface Props {
  onSelect: (type: string) => void
}

const QRCodeTypeSelector: FC<Props> = ({ onSelect }) => (
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