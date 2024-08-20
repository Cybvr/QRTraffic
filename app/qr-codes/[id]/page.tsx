// File: app/qr-codes/[id]/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getQRCode } from '@/services/qrCodeService'
import QRCodeDisplay from '@/components/qr-tools/QRCodeDisplay'

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
              <QRCodeDisplay qrCode={JSON.stringify(qrCodeDetails.data)} customization={qrCodeDetails.customization} />
              <div className="mt-4">
                <p><strong>Type:</strong> {qrCodeDetails.type}</p>
                <p><strong>Created:</strong> {new Date(qrCodeDetails.createdAt).toLocaleDateString()}</p>
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