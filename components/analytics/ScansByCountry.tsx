import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateRandomScans = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const data = [
  { name: 'USA', scans: generateRandomScans(1000, 5000) },
  { name: 'UK', scans: generateRandomScans(1000, 5000) },
  { name: 'Canada', scans: generateRandomScans(1000, 5000) },
  { name: 'Australia', scans: generateRandomScans(1000, 5000) },
  { name: 'Germany', scans: generateRandomScans(1000, 5000) },
];

const ScansByCountry = () => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-4">Scans by country</h3>
      {data.some(item => item.scans > 0) ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="scans" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">Not enough data to show statistics</p>
      )}
    </CardContent>
  </Card>
);

export default ScansByCountry;