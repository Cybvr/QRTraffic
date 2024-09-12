'use client'

import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { getUserQRCodes, QRCodeData } from '@/services/qrCodeService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode.react';

const Dashboard = () => {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([]);
  const { user } = useAuth();
  const [greetingMessage, setGreetingMessage] = useState('Loading...');
  const router = useRouter();

  useEffect(() => {
    const fetchQRCodes = async () => {
      if (user) {
        const codes = await getUserQRCodes(user.uid);
        setQRCodes(codes);
      }
    };
    fetchQRCodes();
  }, [user]);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreetingMessage('Good morning 👋');
    } else if (hours < 18) {
      setGreetingMessage('Good afternoon 👋');
    } else {
      setGreetingMessage('Good evening 👋');
    }
  }, []);

  const totalScans = qrCodes.reduce((sum, code) => sum + code.scanCount, 0);

  const getFirstName = (displayName: string | null) => {
    if (!displayName) return '';
    return displayName.split(' ')[0];
  }

  const userGreeting = user && user.displayName ? `${greetingMessage}, ${getFirstName(user.displayName)}!` : greetingMessage;

  const cardClasses = "p-4 flex items-center space-x-2 h-full";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{userGreeting}</h1>
          <p className="text-muted-foreground">Here is a summary of your QR code campaigns.</p>
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
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/dashboard/qr-codes/my-codes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">QR Codes</CardTitle>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </CardHeader>
            <CardContent className={cardClasses}>
              <div className="text-2xl font-bold">{qrCodes.length}</div>
              <p className="text-xs text-muted-foreground">Total QR Codes</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/qr-codes/scans">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scans</CardTitle>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <ArrowUpIcon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className={cardClasses}>
              <div className="text-2xl font-bold">{totalScans}</div>
              <p className="text-xs text-muted-foreground">Total Scans</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Card className="h-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scans</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map(qrCode => (
                <TableRow key={qrCode.id} className="cursor-pointer" onClick={() => router.push(`/dashboard/qr-codes/view/${qrCode.id}?id=${qrCode.id}`)}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12">
                        <QRCode
                          value={qrCode.content}
                          size={48}
                          level="L"
                          renderAs="svg"
                          className="w-full h-full"
                        />
                      </div>
                      <span>{qrCode.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{qrCode.type}</TableCell>
                  <TableCell>{qrCode.scanCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={qrCode.status === 'Active' ? 'default' : 'secondary'}
                      className={qrCode.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-secondary text-secondary-foreground'}
                    >
                      {qrCode.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{new Date(qrCode.creationDate.toDate()).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;