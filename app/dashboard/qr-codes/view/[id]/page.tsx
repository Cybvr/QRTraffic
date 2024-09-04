'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getQRCode, updateQRCode } from '@/services/qrCodeService';
import QRCodeContentForm from '../../QRCodeContentForm';
import QRCodeCustomizer from '../../QRCodeCustomizer';
import ViewAnalytics from '../viewAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function QRCodeDetailView({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [qrCodeDetails, setQRCodeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const data = await getQRCode(params.id);
        setQRCodeDetails(data);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQRCode();
  }, [params.id]);

  const handleContentSubmit = async (data: any) => {
    try {
      await updateQRCode(params.id, data);
      setQRCodeDetails(prev => ({ ...prev, ...data }));
      console.log('QR Code updated successfully in frontend');
    } catch (error) {
      console.error('Error updating QR code in frontend:', error);
    }
  };

  const handleCustomizationChange = async (customization: any) => {
    try {
      customization = {
        ...customization,
        frameUrl: customization.frameUrl || ''
      };
      await updateQRCode(params.id, { customization });
      setQRCodeDetails(prev => ({ ...prev, customization }));
      console.log('QR Code customization updated successfully in frontend');
    } catch (error) {
      console.error('Error updating QR code customization in frontend:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!qrCodeDetails) return <div>QR code not found</div>;

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Breadcrumbs */}
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm text-gray-500">
          <li className="inline-flex items-center">
            <Link href="/dashboard/qr-codes/my-codes" className="font-medium text-gray-700 hover:text-gray-900">
              My Codes
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4" />
              <span className="ml-1 font-medium text-gray-700">{qrCodeDetails?.name || "QR Code"}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{qrCodeDetails?.name}</h1>
      </div>

      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <QRCodeContentForm
            type={qrCodeDetails.type}
            initialContent={qrCodeDetails.content}
            initialName={qrCodeDetails.name}
            onSubmit={handleContentSubmit}
          />
          <QRCodeCustomizer
            customization={qrCodeDetails.customization}
            initialData={qrCodeDetails}
            onCustomizationChange={handleCustomizationChange}
            onComplete={() => {}}
            initialContent={qrCodeDetails.content}
            initialName={qrCodeDetails.name}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <ViewAnalytics qrCodeId={qrCodeDetails.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}