// app/qr-codes/my-codes/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, Share, Download, MoreHorizontal, Eye, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
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
  { id: '5', name: 'Facebook Page', type: 'Social Media', scans: 100, status: 'Active', creationDate: 'Dec 05, 2024', qrCodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==' },
  { id: '6', name: 'Product Catalog', type: 'PDF', scans: 80, status: 'Active', creationDate: 'Jan 10, 2025', qrCodeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==' },
]

export default function MyCodes() {
  const router = useRouter()
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])

  useEffect(() => {
    // Simulate fetching QR codes
    const fetchQRCodes = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setQRCodes(mockQRCodes)
      setLoading(false)
    }
    fetchQRCodes()
  }, [])

  const filteredQRCodes = qrCodes.filter(qr => 
    qr.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCodes(filteredQRCodes.map(qr => qr.id))
    } else {
      setSelectedCodes([])
    }
  }

  const handleSelectCode = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCodes(prev => [...prev, id])
    } else {
      setSelectedCodes(prev => prev.filter(codeId => codeId !== id))
    }
  }

  const handleDeleteSelected = () => {
    setQRCodes(prev => prev.filter(qr => !selectedCodes.includes(qr.id)))
    setSelectedCodes([])
  }

  const handleEditCode = (id: string) => {
    router.push(`/qr-codes/edit/${id}`)
  }

  const handleViewAnalytics = (id: string) => {
    router.push(`/analytics?qr=${id}`)
  }

  const handleDeleteCode = (id: string) => {
    setQRCodes(prev => prev.filter(qr => qr.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-blue-100 p-4 rounded-lg mb-6 flex justify-between items-center">
        <p className="text-blue-800">
          You have 20 out of 20 free scans left. Subscribe to get unlimited scans.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Subscribe</Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search by QR code name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="space-x-2">
          {selectedCodes.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Delete Selected
            </Button>
          )}
          <Button asChild>
            <Link href="/qr-codes/new" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Create QR code
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedCodes.length === filteredQRCodes.length}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
              </TableHead>
              <TableHead>QR code name</TableHead>
              <TableHead>QR code type</TableHead>
              <TableHead>Scans</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Creation date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQRCodes.map((qrCode) => (
              <TableRow 
                key={qrCode.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleEditCode(qrCode.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedCodes.includes(qrCode.id)}
                    onCheckedChange={(checked) => handleSelectCode(qrCode.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Image 
                      src={qrCode.qrCodeImage} 
                      alt="QR Code" 
                      width={40} 
                      height={40}
                      className="w-10 h-10"
                    />
                    <span>{qrCode.name}</span>
                  </div>
                </TableCell>
                <TableCell>{qrCode.type}</TableCell>
                <TableCell>{qrCode.scans}</TableCell>
                <TableCell>
                  <Badge variant={qrCode.status === 'Active' ? 'default' : 'secondary'}>
                    {qrCode.status}
                  </Badge>
                </TableCell>
                <TableCell>{qrCode.creationDate}</TableCell>
                <TableCell className="text-right">
                  <div onClick={(e) => e.stopPropagation()} className="flex justify-end">
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
      )}
    </div>
  )
}