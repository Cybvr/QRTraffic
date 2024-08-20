'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, Share, Download, MoreHorizontal, Eye, Trash2, Edit, Folder } from 'lucide-react'
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
import { useAuth } from '@/context/AuthContext'
import { getUserQRCodes, deleteQRCode, getUserFolders } from '@/services/qrCodeService'
import { useToast } from '@/components/ui/toast'

interface QRCodeData {
  id: string;
  name: string;
  type: string;
  scans: number;
  status: 'Active' | 'Inactive';
  creationDate: string;
  qrCodeImage: string;
}

interface FolderData {
  id: string;
  name?: string;
  qrCodesCount?: number;
}

export default function MyCodes() {
  const router = useRouter()
  const { user } = useAuth()
  const { addToast } = useToast()
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [folders, setFolders] = useState<FolderData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      try {
        const [fetchedQRCodes, fetchedFolders] = await Promise.all([
          getUserQRCodes(user.uid) as Promise<QRCodeData[]>,
          getUserFolders(user.uid) as Promise<FolderData[]>
        ])
        setQRCodes(fetchedQRCodes)
        const foldersWithCorrectStructure = fetchedFolders.map((folder: FolderData) => ({
          id: folder.id,
          name: folder.name || 'Unnamed Folder',
          qrCodesCount: folder.qrCodesCount || 0,
        }));
        setFolders(foldersWithCorrectStructure)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load QR codes and folders. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

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

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedCodes.map(id => deleteQRCode(id)))
      setQRCodes(prev => prev.filter(qr => !selectedCodes.includes(qr.id)))
      setSelectedCodes([])
      addToast("QR codes deleted successfully", 3000)
    } catch (error) {
      console.error('Error deleting QR codes:', error)
      addToast("Failed to delete QR codes", 3000)
    }
  }

  const handleEditCode = (id: string) => {
    router.push(`/qr-codes/edit/${id}`)
  }

  const handleViewAnalytics = (id: string) => {
    router.push(`/analytics?qr=${id}`)
  }

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteQRCode(id)
      setQRCodes(prev => prev.filter(qr => qr.id !== id))
      addToast("QR code deleted successfully", 3000)
    } catch (error) {
      console.error('Error deleting QR code:', error)
      addToast("Failed to delete QR code", 3000)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (qrCodes.length === 0 && folders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No QR Codes or Folders Yet</h2>
        <p className="mb-4">Get started by creating your first QR code or folder!</p>
        <Button asChild>
          <Link href="/qr-codes/new">Create QR Code</Link>
        </Button>
      </div>
    )
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

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <Folder className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-medium">{folder.name}</h3>
                  <p className="text-sm text-gray-500">{folder.qrCodesCount} QR codes</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer flex items-center justify-center">
            <Plus className="h-6 w-6 text-gray-500 mr-2" />
            <span className="text-gray-500 font-medium">New Folder</span>
          </div>
        </div>
      </div>

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
    </div>
  )
}