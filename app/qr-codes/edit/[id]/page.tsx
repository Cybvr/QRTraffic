"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LinkIcon, UserIcon, SquareStackIcon, BuildingIcon, WifiIcon, GlobeIcon, ChevronRightIcon, ShareIcon, BarChartIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import QRCodeDisplay from '@/components/qr-tools/QRCodeDisplay'
import LinkTool from '@/components/qr-tools/LinkTool'
import VCardTool from '@/components/qr-tools/VCardTool'
import MenuTool from '@/components/qr-tools/MenuTool'
import FacebookTool from '@/components/qr-tools/FacebookTool'
import BusinessTool from '@/components/qr-tools/BusinessTool'
import WiFiTool from '@/components/qr-tools/WiFiTool'

interface CustomizationType {
  logo?: string;
  color: string;
  bgColor: string;
  frame: string;
}

interface QRCodeDetails {
  id: string;
  name: string;
  type: string;
  data: any;
  customization: CustomizationType;
}

interface ToolProps {
  setQRCodeData: React.Dispatch<React.SetStateAction<string>>;
  qrCodeDetails: QRCodeDetails;
}

const tools: Record<string, React.ComponentType<ToolProps>> = {
  Link: LinkTool,
  VCard: VCardTool,
  Menu: MenuTool,
  Facebook: FacebookTool,
  Business: BusinessTool,
  WiFi: WiFiTool,
}

// Mock function to fetch QR code data
const fetchQRCodeData = async (id: string): Promise<QRCodeDetails> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id,
    name: 'My Food Website',
    type: 'Link',
    data: { url: 'https://example.com' },
    customization: {
      logo: 'path/to/logo.png',
      color: '#4F46E5',
      bgColor: '#ffffff',
      frame: 'rounded'
    }
  }
}

export default function EditQRCode({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [qrCodeData, setQRCodeData] = useState<string>('')
  const [qrCodeDetails, setQRCodeDetails] = useState<QRCodeDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQRCodeData = async () => {
      try {
        const data = await fetchQRCodeData(params.id)
        setQRCodeDetails(data)
        setQRCodeData(JSON.stringify(data.data))
      } catch (error) {
        console.error('Error fetching QR code data:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false)
      }
    }
    loadQRCodeData()
  }, [params.id])

  const handleSave = async () => {
    try {
      // Simulating save operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/qr-codes/my-codes')
    } catch (error) {
      console.error('Error saving QR code:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!qrCodeDetails) {
    return <div>Error: QR code details not found</div>
  }

  const ToolComponent = tools[qrCodeDetails.type as keyof typeof tools]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/qr-codes/my-codes">My Codes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{qrCodeDetails.type}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{qrCodeDetails.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center mt-4 mb-6">
        <h1 className="text-2xl font-bold">Edit QR Code</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => router.push(`/analytics?qr=${params.id}`)}>
            <BarChartIcon className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <ShareIcon className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>1. Setup</CardTitle>
            </CardHeader>
            <CardContent>
              {ToolComponent && <ToolComponent setQRCodeData={setQRCodeData} qrCodeDetails={qrCodeDetails} />}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>2. Customize</CardTitle>
            </CardHeader>
            <CardContent>
              
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <QRCodeDisplay qrCode={qrCodeData} customization={qrCodeDetails.customization} />
              <Button onClick={handleSave} className="w-full mt-4">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}