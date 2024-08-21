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
  name: string;
  qrCodesCount: number;
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
          getUserQRCodes(user.uid),
          getUserFolders(user.uid)
        ])
        setQRCodes(fetchedQRCodes)
        setFolders(fetchedFolders)
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
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  }

  if (error) {
    return <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
  }

  if (qrCodes.length === 0 && folders.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">No QR Codes or Folders Yet</h2>
        <p className="mb-6 text-gray-600">Get started by creating your first QR code or folder!</p>
        <Button asChild className="px-6 py-3 text-lg">
          <Link href="/qr-codes/new">Create QR Code</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-blue-50 p-6 rounded-xl mb-8 shadow-sm">
        <p className="text-blue-800 text-base">
          You have <span className="font-semibold">20 out of 20</span> free scans left. <Link href="/pricing" className="font-medium hover:underline text-blue-600">Subscribe to get unlimited scans.</Link>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <Input
          type="text"
          placeholder="Search by QR code name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="space-x-2">
          {selectedCodes.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected} size="sm" className="bg-red-500 hover:bg-red-600">
              Delete Selected
            </Button>
          )}
          <Button asChild size="sm" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/qr-codes/new">
              <Plus className="mr-2 h-4 w-4" /> Create QR code
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer shadow-sm hover:shadow-md">
              <div className="flex items-center space-x-4">
                <Folder className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium text-lg text-gray-800">{folder.name}</h3>
                  <p className="text-sm text-gray-500">{folder.qrCodesCount} QR codes</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center">
            <Plus className="h-8 w-8 text-blue-500 mr-3" />
            <span className="text-blue-600 font-medium text-lg">New Folder</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedCodes.length === filteredQRCodes.length}
                  onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
              </TableHead>
              <TableHead className="font-semibold text-gray-700">QR code name</TableHead>
              <TableHead className="font-semibold text-gray-700">QR code type</TableHead>
              <TableHead className="font-semibold text-gray-700">Scans</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Creation date</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQRCodes.map((qrCode) => (
              <TableRow 
                key={qrCode.id} 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleEditCode(qrCode.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedCodes.includes(qrCode.id)}
                    onCheckedChange={(checked) => handleSelectCode(qrCode.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image 
                      src={qrCode.qrCodeImage} 
                      alt="QR Code" 
                      width={48} 
                      height={48}
                      className="rounded-lg shadow-sm"
                    />
                    <span className="font-medium text-gray-800">{qrCode.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{qrCode.type}</TableCell>
                <TableCell className="text-gray-600">{qrCode.scans}</TableCell>
                <TableCell>
                  <Badge variant={qrCode.status === 'Active' ? 'default' : 'secondary'} className={qrCode.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {qrCode.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{qrCode.creationDate}</TableCell>
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