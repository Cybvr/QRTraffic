// File: app/qr-codes/my-codes/page.tsx

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { getUserQRCodes, deleteQRCode } from '@/services/qrCodeService'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share, Download, MoreHorizontal, Edit, Eye, Trash2 } from 'lucide-react'
import Image from 'next/image'

export default function MyQRCodes() {
  const [qrCodes, setQRCodes] = useState<any[]>([])
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchQRCodes = async () => {
      if (user) {
        const codes = await getUserQRCodes(user.uid)
        setQRCodes(codes)
      }
    }
    fetchQRCodes()
  }, [user])

  const handleSelectCode = (id: string, checked: boolean) => {
    setSelectedCodes(prev => 
      checked ? [...prev, id] : prev.filter(codeId => codeId !== id)
    )
  }

  const handleEditCode = (id: string) => {
    router.push(`/qr-codes/edit/${id}`)
  }

  const handleViewAnalytics = (id: string) => {
    router.push(`/qr-codes/${id}`)
  }

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteQRCode(id)
      setQRCodes(prev => prev.filter(code => code.id !== id))
    } catch (error) {
      console.error('Error deleting QR code:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My QR Codes</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedCodes.length === qrCodes.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCodes(qrCodes.map(code => code.id))
                    } else {
                      setSelectedCodes([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Scans</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qrCodes.map((qrCode) => (
              <TableRow key={qrCode.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCodes.includes(qrCode.id)}
                    onCheckedChange={(checked) => handleSelectCode(qrCode.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={qrCode.customization.logo || '/placeholder-qr.png'}
                      alt={qrCode.name}
                      width={48}
                      height={48}
                      className="rounded-lg shadow-sm"
                    />
                    <span className="font-medium text-gray-800">{qrCode.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{qrCode.type}</TableCell>
                <TableCell className="text-gray-600">{qrCode.scanCount}</TableCell>
                <TableCell>
                  <Badge
                    variant={qrCode.status === 'Active' ? 'default' : 'secondary'}
                    className={qrCode.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {qrCode.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{new Date(qrCode.creationDate.toDate()).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div onClick={(e) => e.stopPropagation()} className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white shadow-lg rounded-lg border border-gray-200">
                        <DropdownMenuItem onClick={() => handleEditCode(qrCode.id)} className="hover:bg-gray-100">
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewAnalytics(qrCode.id)} className="hover:bg-gray-100">
                          <Eye className="mr-2 h-4 w-4 text-green-500" /> View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCode(qrCode.id)} className="hover:bg-gray-100">
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Delete
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