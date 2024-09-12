'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserQRCodes, deleteQRCode } from '@/services/qrCodeService';
import { getAuth } from 'firebase/auth';
import QRCode from 'qrcode.react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Share2,
  Download,
  BarChart,
  Trash2,
  ChevronDown,
  Plus
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const MyQRCodes = () => {
  const [qrCodes, setQRCodes] = useState<any[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState('mostRecent');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentShareCode, setCurrentShareCode] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const codes = await getUserQRCodes(user.uid);
        if (sorting === 'mostRecent') {
          codes.sort((a, b) => b.creationDate.toMillis() - a.creationDate.toMillis());
        }
        setQRCodes(codes);
      }
      setLoading(false);
    });
  }, [sorting]);

  const handleSelectCode = (id: string, checked: boolean) => {
    setSelectedCodes(prev => checked ? [...prev, id] : prev.filter(codeId => codeId !== id));
  };

  const handleViewCode = (id: string) => {
    router.push(`/dashboard/qr-codes/view/${id}?id=${id}`);
  };

  const handleViewAnalytics = (id: string) => {
    router.push(`/dashboard/qr-codes/view/${id}?id=${id}&tab=analytics`);
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedCodes) {
        await deleteQRCode(id);
      }
      setQRCodes(prev => prev.filter(code => !selectedCodes.includes(code.id)));
      setSelectedCodes([]);
    } catch (error) {
      console.error('Error deleting QR codes:', error);
    }
  };

  const handleDownloadCode = (qrCode: any) => {
    const canvas = document.querySelector(`canvas#qr-code-canvas-${qrCode.id}`) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${qrCode.name}.png`;
      link.click();
    }
  };

  const openShareDialog = (qrCode: any) => {
    setCurrentShareCode(qrCode);
    setShareDialogOpen(true);
  };

  const closeShareDialog = () => {
    setShareDialogOpen(false);
    setCurrentShareCode(null);
  };

  const handleCopyLink = () => {
    if (currentShareCode) {
      const link = `${window.location.origin}/qr/${currentShareCode.id}`;
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard');
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      await deleteQRCode(id);
      setQRCodes(prev => prev.filter(code => code.id !== id));
    } catch (error) {
      console.error('Error deleting QR code:', error);
    }
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My QR Codes</h1>
            <p className="text-muted-foreground">Manage your QR codes here.</p>
          </div>
          <Button
            variant="default"
            onClick={() => router.push('/dashboard/qr-codes/new')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New QR Code
          </Button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            {selectedCodes.length === 0 ? (
              <Button
                variant="outline"
                onClick={() => setSelectedCodes(qrCodes.map(code => code.id))}
              >
                Select All
              </Button>
            ) : (
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCodes([])}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteSelected}>
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Sort by
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSorting('mostRecent')}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSorting('oldest')}>
                Oldest
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedCodes.length === qrCodes.length && qrCodes.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCodes(qrCodes.map(code => code.id));
                      } else {
                        setSelectedCodes([]);
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
              {loading ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="w-4 h-4" /></TableCell>
                      <TableCell><Skeleton className="w-32 h-6" /></TableCell>
                      <TableCell><Skeleton className="w-24 h-6" /></TableCell>
                      <TableCell><Skeleton className="w-16 h-6" /></TableCell>
                      <TableCell><Skeleton className="w-16 h-6" /></TableCell>
                      <TableCell><Skeleton className="w-24 h-6" /></TableCell>
                      <TableCell><Skeleton className="w-20 h-10" /></TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                qrCodes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No QR Codes Found.
                    </TableCell>
                  </TableRow>
                ) : (
                  qrCodes.map((qrCode) => (
                    <TableRow key={qrCode.id} className="cursor-pointer" onClick={() => handleViewCode(qrCode.id)}>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedCodes.includes(qrCode.id)}
                          onCheckedChange={(checked) => handleSelectCode(qrCode.id, checked as boolean)}
                          aria-label={`Select ${qrCode.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <QRCode value={qrCode.url ?? ''} size={48} renderAs="canvas" id={`qr-code-canvas-${qrCode.id}`} />
                          <span className="font-medium">{qrCode.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{qrCode.type}</TableCell>
                      <TableCell>{qrCode.scanCount}</TableCell>
                      <TableCell>
                        <Badge variant={qrCode.status === 'Active' ? 'default' : 'secondary'}>
                          {qrCode.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(qrCode.creationDate.toDate()).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label="Share" onClick={() => openShareDialog(qrCode)}>
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Download"
                                onClick={() => handleDownloadCode(qrCode)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label="View Analytics" onClick={() => handleViewAnalytics(qrCode.id)}>
                                <BarChart className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Analytics</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => handleDeleteCode(qrCode.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent>
            <DialogTitle>Share QR Code</DialogTitle>
            {currentShareCode && (
              <div className="space-y-4">
                <p>Share this link:</p>
                <Input type="text" readOnly value={`${window.location.origin}/qr/${currentShareCode.id}`} />
                <Button onClick={handleCopyLink} variant="secondary">Copy Link</Button>
              </div>
            )}
            <DialogFooter>
              <Button onClick={closeShareDialog} variant="outline">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default MyQRCodes;