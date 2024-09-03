'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { CalendarIcon } from 'lucide-react';
import { getAnalytics, getQRCodeCount, getUserQRCodes, QRCodeData } from '@/services/qrCodeService';
import { useAuth } from '@/context/AuthContext';
import ScansByOS from './ScansByOS';
import ScansByCountry from './ScansByCountry';
import ScansByCity from './ScansByCity';
import ScanActivityChart from './ScanActivityChart';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('Jul 18, 2024 - Aug 18, 2024');
  const [qrCodeName, setQrCodeName] = useState('All');
  const [operatingSystem, setOperatingSystem] = useState('All');
  const [country, setCountry] = useState('All');
  const [city, setCity] = useState('All');
  const [qrCodeId, setQrCodeId] = useState<string | null>(null);
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([]);
  const [analyticsData, setAnalyticsData] = useState({
    totalQRCodes: 0,
    totalScans: 0,
    uniqueScans: 0
  });

  const { user } = useAuth();

  const operatingSystems = ['iOS', 'Android', 'Windows', 'macOS', 'Linux'];
  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];
  const cities = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo'];

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const count = await getQRCodeCount(user.uid);
        const codes = await getUserQRCodes(user.uid);
        setQRCodes(codes);
        const startDate = new Date("2024-07-18");
        const endDate = new Date("2024-08-18");
        const analytics = await getAnalytics(startDate, endDate);
        setAnalyticsData(prevData => ({
          ...prevData,
          totalQRCodes: count,
          totalScans: analytics.scansData.reduce((sum, day) => sum + day.scans, 0),
          uniqueScans: analytics.scansData.reduce((sum, day) => sum + new Set(day.uniqueUsers).size, 0)
        }));

        if (codes.length > 0) {
          setQrCodeId(codes[0]?.id || null);
        }
      }
    };

    fetchData();
  }, [user]);

  if (!qrCodeId) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Scan limits</h2>
            <p className="text-sm text-gray-500">You have {5 - analyticsData.totalQRCodes} out of 5 free scans left. Subscribe to get unlimited scans.</p>
          </div>
          <Button>Subscribe</Button>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <span>{dateRange}</span>
        </div>
        <Button variant="outline">Export data</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Select value={qrCodeName} onValueChange={setQrCodeName}>
          <SelectTrigger>
            <SelectValue placeholder="QR Code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {qrCodes.map((code) => (
              <SelectItem key={code.id} value={code.id || ''}>{code.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={operatingSystem} onValueChange={setOperatingSystem}>
          <SelectTrigger>
            <SelectValue placeholder="Operating System" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {operatingSystems.map((os) => (
              <SelectItem key={os} value={os}>{os}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={city} onValueChange={setCity}>
          <SelectTrigger>
            <SelectValue placeholder="Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalQRCodes}</p>
                <p className="text-sm text-gray-500">Total number of QR codes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalScans}</p>
                <p className="text-sm text-gray-500">Total scans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.uniqueScans}</p>
                <p className="text-sm text-gray-500">Unique scans</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scanActivity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scanActivity">Scan Activity</TabsTrigger>
          <TabsTrigger value="scansByOS">Scans by OS</TabsTrigger>
          <TabsTrigger value="scansByCountry">Scans by Country</TabsTrigger>
          <TabsTrigger value="scansByCity">Scans by City</TabsTrigger>
        </TabsList>
        <TabsContent value="scanActivity">
          <Card>
            <CardHeader>
              <CardTitle>Scan Activity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ScanActivityChart qrCodeId={qrCodeId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scansByOS">
          <ScansByOS qrCodeId={qrCodeId} />
        </TabsContent>
        <TabsContent value="scansByCountry">
          <ScansByCountry qrCodeId={qrCodeId} />
        </TabsContent>
        <TabsContent value="scansByCity">
          <ScansByCity qrCodeId={qrCodeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;