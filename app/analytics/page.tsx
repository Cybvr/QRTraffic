'use client'

import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data
const mockData = {
  scansData: [
    { date: 'Jul 22', scans: 30 },
    { date: 'Jul 23', scans: 40 },
    { date: 'Jul 24', scans: 55 },
    { date: 'Jul 25', scans: 45 },
    { date: 'Jul 26', scans: 25 },
    { date: 'Jul 27', scans: 40 },
    { date: 'Jul 28', scans: 50 },
  ],
  usersData: [
    { date: 'Jul 22', users: 30 },
    { date: 'Jul 23', users: 35 },
    { date: 'Jul 24', users: 55 },
    { date: 'Jul 25', users: 45 },
    { date: 'Jul 26', users: 25 },
    { date: 'Jul 27', users: 35 },
    { date: 'Jul 28', users: 45 },
  ],
  deviceData: [
    { name: 'iPhone', value: 20 },
    { name: 'Mac', value: 4 },
  ],
  campaignTypes: [
    { name: 'Website', value: 0.8 },
    { name: 'Landing Pages', value: 0.6 },
    { name: 'Event', value: 0.5 },
    { name: 'App Download', value: 0.4 },
    { name: 'Digital Business', value: 0.2 },
  ],
  cityData: [
    { city: 'Southwark', country: 'England', scans: 843, percentage: '33%' },
    { city: 'Lagos', country: 'Nigeria', scans: 594, percentage: '33%' },
    { city: 'Zagreb', country: 'Croatia', scans: 493, percentage: '33%' },
    { city: 'New Delhi', country: 'India', scans: 454, percentage: '33%' },
    { city: 'New York', country: 'USA', scans: 843, percentage: '33%' },
    { city: 'Brussels', country: 'Belgium', scans: 495, percentage: '33%' },
    { city: 'Southwark', country: 'England', scans: 832, percentage: '33%' },
  ],
};

const AnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockData);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <StatCards />
      <DataChart title="Scans" data={data.scansData} dataKey="scans" />
      <DataChart title="Users" data={data.usersData} dataKey="users" />
      <PerformanceSection campaignTypes={data.campaignTypes} />
      <DeviceSection deviceData={data.deviceData} />
      <CitySection cityData={data.cityData} />
    </div>
  );
};

const Header = () => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">QR Code Analytics</h1>
    <div className="flex space-x-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">Last 7 days</SelectItem>
          <SelectItem value="30days">Last 30 days</SelectItem>
          <SelectItem value="90days">Last 90 days</SelectItem>
        </SelectContent>
      </Select>
      {['Filters', 'Export', 'Share'].map((text) => (
        <Button key={text} variant="outline">{text}</Button>
      ))}
    </div>
  </div>
);

const StatCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <StatCard title="Scans" value={5476} change={15} />
    <StatCard title="Users" value={758} change={20} />
  </div>
);

const StatCard = ({ title, value, change }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
      <p className="text-green-500 flex items-center">
        <ArrowUpIcon className="h-4 w-4 mr-1" />
        {change}% than the previous month
      </p>
    </CardContent>
  </Card>
);

const DataChart = ({ title, data, dataKey }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {data && data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">{title}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell className="text-right">{item[dataKey]} {dataKey}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No {dataKey} data available</p>
      )}
      <ChartSummary title={title} value={data.reduce((sum, item) => sum + item[dataKey], 0)} />
    </CardContent>
  </Card>
);

const ChartSummary = ({ title, value }) => (
  <div className="mt-4">
    <p className="font-semibold">{title}: {value.toLocaleString()} <span className="text-green-500">↑ 40%</span></p>
    <p className="text-sm text-gray-500">Jul 22, 2024 to Jul 28,2024</p>
    <p className="font-semibold mt-2">Previous {title.toLowerCase()}: {Math.floor(value * 0.67).toLocaleString()} <span className="text-green-500">↑ 40%</span></p>
    <p className="text-sm text-gray-500">Jul 22, 2024 to Jul 28,2024</p>
  </div>
);

const PerformanceSection = ({ campaignTypes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <PerformanceCard title="Top performing QR Codes" data={[{ name: 'QR Code 1', value: 0.8 }]} />
    <PerformanceCard title="Top performing Campaign Types" data={campaignTypes} />
  </div>
);

const PerformanceCard = ({ title, data }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{(item.value * 100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const DeviceSection = ({ deviceData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <DeviceUsage deviceData={deviceData} />
    <Card>
      <CardHeader>
        <CardTitle>Scans by Device Used</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Calendar view of scans by device would go here</p>
      </CardContent>
    </Card>
  </div>
);

const DeviceUsage = ({ deviceData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Scans by Device Used</CardTitle>
    </CardHeader>
    <CardContent>
      {deviceData && deviceData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device Used</TableHead>
              <TableHead>Scans</TableHead>
              <TableHead>% of scans</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deviceData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{((item.value / deviceData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No device data available</p>
      )}
    </CardContent>
  </Card>
);

const CitySection = ({ cityData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Scans by City</CardTitle>
    </CardHeader>
    <CardContent>
      {cityData && cityData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Scans</TableHead>
              <TableHead className="text-right">% of scans</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cityData.map((city, index) => (
              <TableRow key={index}>
                <TableCell>{city.city}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell className="text-right">{city.scans}</TableCell>
                <TableCell className="text-right">{city.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No city data available</p>
      )}
    </CardContent>
  </Card>
);

export default AnalyticsDashboard;