import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/app/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAnalytics } from '@/services/qrCodeService';

type CountryDataType = { country: string; scans: number }[];

const ScansByCountry = ({ qrCodeId }) => {
  const [countryData, setCountryData] = useState<CountryDataType>([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      const startDate = new Date("2024-07-18");
      const endDate = new Date("2024-08-18");
      const analyticsData = await getAnalytics(startDate, endDate, qrCodeId);
      setCountryData(Object.entries(analyticsData.countryData).map(([country, scans]) => ({ country, scans: Number(scans) })));
    };

    fetchCountryData();
  }, [qrCodeId]);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Scans by Country</h3>
        {countryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="scans" fill="var(--chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">Not enough data to show statistics</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ScansByCountry;