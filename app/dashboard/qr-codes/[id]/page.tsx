'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getQRCode } from '@/services/qrCodeService'
import QRCode from 'qrcode.react'

// Dummy data for analytics
const analyticsData = [
  { name: 'Jan', scans: 400 },
  { name: 'Feb', scans: 300 },
  { name: 'Mar', scans: 200 },
  { name: 'Apr', scans: 278 },
  { name: 'May', scans: 189 },
]

export default function QRCodeDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [qrCodeDetails, setQRCodeDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const data = await getQRCode(params.id)
        setQRCodeDetails(data)
      } catch (error) {
        console.error('Error fetching QR code:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchQRCode()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!qrCodeDetails) return <div>QR code not found</div>

  const renderQRCodeContent = () => {
    switch (qrCodeDetails.type) {
      case 'Link':
        return <p><strong>URL:</strong> {qrCodeDetails.content.url}</p>
      case 'VCard':
        return (
          <>
            <p><strong>Name:</strong> {qrCodeDetails.content.firstName} {qrCodeDetails.content.lastName}</p>
            <p><strong>Phone:</strong> {qrCodeDetails.content.phone}</p>
            <p><strong>Email:</strong> {qrCodeDetails.content.email}</p>
            <p><strong>Company:</strong> {qrCodeDetails.content.company}</p>
            <p><strong>Title:</strong> {qrCodeDetails.content.title}</p>
          </>
        )
      case 'Restaurants Menu':
        return (
          <>
            <p><strong>Restaurant:</strong> {qrCodeDetails.content.restaurantName}</p>
            <p><strong>Menu URL:</strong> {qrCodeDetails.content.menuUrl}</p>
          </>
        )
      case 'Facebook':
        return <p><strong>Facebook URL:</strong> {qrCodeDetails.content.facebookUrl}</p>
      case 'Business Page':
        return (
          <>
            <p><strong>Business:</strong> {qrCodeDetails.content.businessName}</p>
            <p><strong>Address:</strong> {qrCodeDetails.content.address}</p>
            <p><strong>Phone:</strong> {qrCodeDetails.content.phone}</p>
            <p><strong>Website:</strong> {qrCodeDetails.content.website}</p>
          </>
        )
      case 'WiFi':
        return (
          <>
            <p><strong>Network:</strong> {qrCodeDetails.content.ssid}</p>
            <p><strong>Encryption:</strong> {qrCodeDetails.content.encryption}</p>
          </>
        )
      default:
        return <p>Unknown QR code type</p>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{qrCodeDetails.name}</h1>
        <Button onClick={() => router.push(`/qr-codes/edit/${params.id}`)}>
          Edit QR Code
        </Button>
      </div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <QRCode value={JSON.stringify(qrCodeDetails.content)} size={200} />
              </div>
              <div className="mt-4">
                <p><strong>Type:</strong> {qrCodeDetails.type}</p>
                <p><strong>Created:</strong> {new Date(qrCodeDetails.creationDate).toLocaleDateString()}</p>
                {renderQRCodeContent()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Scan Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scans" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}