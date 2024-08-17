'use client'

import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from 'lucide-react';

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
      <select className="border rounded p-2">
        <option>Last 7 days</option>
      </select>
      {['Filters', 'Export', 'Share'].map((text) => (
        <button key={text} className="bg-blue-500 text-white px-4 py-2 rounded">
          {text}
        </button>
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
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    <p className="text-green-500 flex items-center">
      <ArrowUpIcon className="h-4 w-4 mr-1" />
      {change}% than the previous month
    </p>
  </div>
);

const DataChart = ({ title, data, dataKey }) => (
  <div className="bg-white p-6 rounded-lg shadow mb-8">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {data && data.length > 0 ? (
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.date}</span>
            <span>{item[dataKey]} {dataKey}</span>
          </div>
        ))}
      </div>
    ) : (
      <p>No {dataKey} data available</p>
    )}
    <ChartSummary title={title} value={data.reduce((sum, item) => sum + item[dataKey], 0)} />
  </div>
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
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>{item.name}</span>
          <span>{(item.value * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  </div>
);

const DeviceSection = ({ deviceData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <DeviceUsage deviceData={deviceData} />
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Scans by Device Used</h2>
      <p>Calendar view of scans by device would go here</p>
    </div>
  </div>
);

const DeviceUsage = ({ deviceData }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Scans by Device Used</h2>
    {deviceData && deviceData.length > 0 ? (
      <>
        <div className="space-y-2">
          {deviceData.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.value} scans</span>
            </div>
          ))}
        </div>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Device Used</th>
              <th>Scans</th>
              <th>% of scans</th>
            </tr>
          </thead>
          <tbody>
            {deviceData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value}</td>
                <td>{((item.value / deviceData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : (
      <p>No device data available</p>
    )}
  </div>
);

const CitySection = ({ cityData }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Scans by City</h2>
    {cityData && cityData.length > 0 ? (
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">City</th>
            <th className="text-left">Country</th>
            <th className="text-right">Scans</th>
            <th className="text-right">% of scans</th>
          </tr>
        </thead>
        <tbody>
          {cityData.map((city, index) => (
            <tr key={index}>
              <td>{city.city}</td>
              <td>{city.country}</td>
              <td className="text-right">{city.scans}</td>
              <td className="text-right">{city.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No city data available</p>
    )}
  </div>
);

export default AnalyticsDashboard;