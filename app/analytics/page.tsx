'use client'

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import ScanActivityChart from '@/components/analytics/ScanActivityChart';
import ScansByOS from '@/components/analytics/ScansByOS';
import ScansByCountry from '@/components/analytics/ScansByCountry';
import ScansByCity from '@/components/analytics/ScansByCity';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('Jul 18, 2024 - Aug 18, 2024');
  const [qrCodeName, setQrCodeName] = useState('All');
  const [operatingSystem, setOperatingSystem] = useState('All');
  const [country, setCountry] = useState('All');
  const [city, setCity] = useState('All');

  // Sample data for select options
  const qrCodes = ['QR Code 1', 'QR Code 2', 'QR Code 3', 'QR Code 4', 'QR Code 5'];
  const operatingSystems = ['iOS', 'Android', 'Windows', 'macOS', 'Linux'];
  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];
  const cities = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo'];

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Scan limits</h2>
            <p className="text-sm text-gray-500">You have 20 out of 20 free scans left. Subscribe to get unlimited scans.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Select value={qrCodeName} onValueChange={setQrCodeName}>
          <SelectTrigger>
            <SelectValue placeholder="QR code name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {qrCodes.map((code) => (
              <SelectItem key={code} value={code}>{code}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={operatingSystem} onValueChange={setOperatingSystem}>
          <SelectTrigger>
            <SelectValue placeholder="Operating systems" />
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
                <p className="text-2xl font-bold">{generateRandomNumber(1, 10)}</p>
                <p className="text-sm text-gray-500">Total number of QR codes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{generateRandomNumber(0, 10000)}</p>
                <p className="text-sm text-gray-500">Total scans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{generateRandomNumber(0, 10000)}</p>
                <p className="text-sm text-gray-500">Unique scans</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Scan activity 18 July - 18 August</h3>
          <ScanActivityChart />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ScansByOS />
        <ScansByCountry />
      </div>

      <ScansByCity />
    </div>
  );
};

export default AnalyticsDashboard;