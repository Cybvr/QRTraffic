// app/qr-codes/my-codes/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode.react'
import { Plus, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface QRCodeData {
  id: string
  url: string
  title: string
  created_at: string
}

// Mock data for demo purposes
const mockQRCodes: QRCodeData[] = [
  { id: '1', url: 'https://example.com/1', title: 'Example QR Code 1', created_at: '2023-08-01T00:00:00Z' },
  { id: '2', url: 'https://example.com/2', title: 'Example QR Code 2', created_at: '2023-08-02T00:00:00Z' },
  { id: '3', url: 'https://example.com/3', title: 'Example QR Code 3', created_at: '2023-08-03T00:00:00Z' },
]

export default function MyCodes() {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching QR codes
    const fetchQRCodes = async () => {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setQRCodes(mockQRCodes)
      setLoading(false)
    }
    fetchQRCodes()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My QR Codes</h1>
        <Button asChild>
          <Link href="/qr-codes/new">
            <Plus className="mr-2 h-4 w-4" /> Create New QR Code
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[150px] w-[150px] mx-auto" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : qrCodes.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p>You haven&apos;t created any QR codes yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qrCode) => (
            <Card key={qrCode.id}>
              <CardHeader>
                <CardTitle>{qrCode.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <QRCode value={qrCode.url} size={150} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(qrCode.created_at).toLocaleDateString()}
                </p>
                <Button variant="outline" asChild>
                  <Link href={`/qr-codes/${qrCode.id}`}>
                    <ExternalLink className="mr-2 h-4 w-4" /> View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}