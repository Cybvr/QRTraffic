'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatCards from "@/components/analytics/StatCards";
import { DataChart } from "@/components/analytics/DataChart";
import TopPerformingQRCodes from "@/components/analytics/TopPerformingQRCodes";
import TopPerformingCampaignTypes from "@/components/analytics/TopPerformingCampaignTypes";
import DeviceSection from "@/components/analytics/DeviceSection";
import CitySection from "@/components/analytics/CitySection";

// Define the DataPoint type if it's not already defined elsewhere
interface DataPoint {
  date: string;
  scans?: number;
  users?: number;
}

interface CityData {
  city: string;
  country: string;
  scans: number;
  percentage: string;
}

interface MockData {
  scansData: DataPoint[];
  usersData: DataPoint[];
  deviceData: { name: string; value: number }[];
  campaignTypes: { name: string; value: number }[];
  topQRCodes: { name: string; value: number }[];
  cityData: CityData[];
}

const mockData: MockData = {
  scansData: [
    { date: '2024-07-22', scans: 30 },
    { date: '2024-07-23', scans: 40 },
    { date: '2024-07-24', scans: 55 },
    { date: '2024-07-25', scans: 45 },
    { date: '2024-07-26', scans: 25 },
    { date: '2024-07-27', scans: 40 },
    { date: '2024-07-28', scans: 50 },
  ],
  usersData: [
    { date: '2024-07-22', users: 30 },
    { date: '2024-07-23', users: 35 },
    { date: '2024-07-24', users: 55 },
    { date: '2024-07-25', users: 45 },
    { date: '2024-07-26', users: 25 },
    { date: '2024-07-27', users: 35 },
    { date: '2024-07-28', users: 45 },
  ],
  deviceData: [
    { name: 'iPhone', value: 20 },
    { name: 'Mac', value: 4 },
  ],
  campaignTypes: [
    { name: 'Website', value: 35 },
    { name: 'Landing Pages', value: 25 },
    { name: 'Event', value: 20 },
    { name: 'App Download', value: 15 },
    { name: 'Digital Business', value: 5 },
  ],
  topQRCodes: [
    { name: 'QR Code 1', value: 30 },
    { name: 'QR Code 2', value: 25 },
    { name: 'QR Code 3', value: 20 },
    { name: 'QR Code 4', value: 15 },
    { name: 'QR Code 5', value: 10 },
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
  const [data, setData] = useState<MockData>(mockData);
  const [timeframe, setTimeframe] = useState('7days');

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">QR Code Analytics</h1>
        <div className="flex flex-wrap gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
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

      <StatCards 
        scans={5476} 
        scanIncrease={15} 
        users={758} 
        userIncrease={20} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DataChart 
          title="Scans" 
          data={data.scansData} 
          dataKey="scans" 
          total={data.scansData.reduce((sum, item) => sum + (item.scans || 0), 0)}
          increase={15}
          previousTotal={4762}
          dateRange="Jul 22, 2024 to Jul 28, 2024"
        />
        <DataChart 
          title="Users" 
          data={data.usersData} 
          dataKey="users" 
          total={data.usersData.reduce((sum, item) => sum + (item.users || 0), 0)}
          increase={20}
          previousTotal={632}
          dateRange="Jul 22, 2024 to Jul 28, 2024"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopPerformingQRCodes data={data.topQRCodes} />
        <TopPerformingCampaignTypes data={data.campaignTypes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DeviceSection deviceData={data.deviceData} />
        <CitySection cityData={data.cityData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;