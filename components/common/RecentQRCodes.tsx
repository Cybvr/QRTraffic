// components/common/RecentQRCodes.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Share, Download, MoreHorizontal, Eye, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

interface QRCodeData {
  id: string
  name: string
  type: string
  scans: number
  status: 'Active' | 'Inactive'
  creationDate: string
  qrCodeImage: string
}

// Mock data for demo purposes
const mockQRCodes: QRCodeData[] = [
  { id: '1', name: 'VisualHQ', type: 'Website URL', scans: 150, status: 'Active', creationDate: 'Aug 07, 2024', qrCodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==' },
  { id: '2', name: 'CoffeeShop Menu', type: 'Menu', scans: 75, status: 'Active', creationDate: 'Sep 15, 2024', qrCodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==' },
  { id: '3', name: 'TechConf 2025', type: 'vCard', scans: 200, status: 'Inactive', creationDate: 'Oct 01, 2024', qrCodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==' },
  { id: '4', name: 'WiFi Hotspot', type: 'WiFi', scans: 50, status: 'Active', creationDate: 'Nov 20, 2024', qrCodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==' },
]

export default function RecentQRCodes() {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])

  useEffect(() => {
    // Simulate fetching QR codes
    const fetchQRCodes = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setQRCodes(mockQRCodes)
    }
    fetchQRCodes()
  }, [])

  const handleEditCode = (id: string) => {
    console.log(`Edit code ${id}`)
  }

  const handleViewAnalytics = (id: string) => {
    console.log(`View analytics for ${id}`)
  }

  const handleDeleteCode = (id: string) => {
    console.log(`Delete code ${id}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mt-6 mb-4">Recent QR Codes</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Scans</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Creation date</TableHead>
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qrCodes.map((qrCode) => (
              <TableRow 
                key={qrCode.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleEditCode(qrCode.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Image 
                      src={qrCode.qrCodeImage} 
                      alt="QR Code" 
                      width={40} 
                      height={40}
                      className="w-10 h-10 flex-shrink-0"
                    />
                    <span className="truncate">{qrCode.name}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{qrCode.type}</TableCell>
                <TableCell>{qrCode.scans}</TableCell>
                <TableCell>
                  <Badge variant={qrCode.status === 'Active' ? 'default' : 'secondary'}>
                    {qrCode.status}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">{qrCode.creationDate}</TableCell>
                <TableCell className="text-left">
                  <div onClick={(e) => e.stopPropagation()} className="flex justify-start">
                    <Button variant="outline" size="sm" className="mr-2">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditCode(qrCode.id)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewAnalytics(qrCode.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCode(qrCode.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}