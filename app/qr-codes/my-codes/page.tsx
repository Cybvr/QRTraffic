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
import EmptyState from '@/components/ui/emptyState'

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

  if (!qrCodes.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="No QR Codes Found"
          description="Create your first QR code to get started."
          buttonText="Create New QR Code"
          buttonAction={() => router.push('/qr-codes/new')}
        />
        <div className="mt-8 border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox disabled={true} aria-label="Select all" />
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
              <TableRow>
                <TableCell>
                  <Checkbox disabled={true} aria-label="Select row" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/placeholder-qr.png"
                      alt="Placeholder QR"
                      width={48}
                      height={48}
                      className="rounded-lg shadow-sm"
                    />
                    <span className="font-medium">Example QR Code</span>
                  </div>
                </TableCell>
                <TableCell>Type</TableCell>
                <TableCell>0</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    Inactive
                  </Badge>
                </TableCell>
                <TableCell>MM/DD/YYYY</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My QR Codes</h1>
      <div className="border rounded-lg overflow-hidden">
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
                  aria-label="Select all"
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
                    aria-label={`Select ${qrCode.name}`}
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
                    <span className="font-medium">{qrCode.name}</span>
                  </div>
                </TableCell>
                <TableCell>{qrCode.type}</TableCell>
                <TableCell>{qrCode.scanCount}</TableCell>
                <TableCell>
                  <Badge
                    variant={qrCode.status === 'Active' ? 'default' : 'secondary'}
                  >
                    {qrCode.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(qrCode.creationDate.toDate()).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div onClick={(e) => e.stopPropagation()} className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Share">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="More options">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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