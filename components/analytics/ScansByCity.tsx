import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const generateRandomScans = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const data = [
  { city: 'New York', country: 'USA', scans: generateRandomScans(1000, 5000) },
  { city: 'London', country: 'UK', scans: generateRandomScans(1000, 5000) },
  { city: 'Toronto', country: 'Canada', scans: generateRandomScans(1000, 5000) },
  { city: 'Sydney', country: 'Australia', scans: generateRandomScans(1000, 5000) },
  { city: 'Berlin', country: 'Germany', scans: generateRandomScans(1000, 5000) },
];

const ScansByCity = () => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-4">Scans by city</h3>
      {data.some(item => item.scans > 0) ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Scans</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.scans}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-gray-500">Not enough data to show statistics</p>
      )}
    </CardContent>
  </Card>
);

export default ScansByCity;