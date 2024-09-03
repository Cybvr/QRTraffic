import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { getAnalytics } from '@/services/qrCodeService';

type CityDataType = { city: string; scans: number }[];

const ScansByCity = ({ qrCodeId }) => {
  const [cityData, setCityData] = useState<CityDataType>([]);

  useEffect(() => {
    const fetchCityData = async () => {
      const startDate = new Date("2024-07-18");
      const endDate = new Date("2024-08-18");
      const analyticsData = await getAnalytics(startDate, endDate, qrCodeId);
      setCityData(Object.entries(analyticsData.cityData).map(([city, scans]) => ({ city, scans: Number(scans) })));
    };
    fetchCityData();
  }, [qrCodeId]);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Scans by City</h3>
        {cityData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Scans</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cityData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.city}</TableCell>
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
};

export default ScansByCity;