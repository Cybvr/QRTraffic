import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAnalytics, ScanData } from '@/services/qrCodeService';

const ScanActivityChart = ({ qrCodeId }) => {
  const [data, setData] = useState<ScanData[]>([]); // Proper type definition

  useEffect(() => {
    const fetchData = async () => {
      const startDate = new Date("2024-07-18");
      const endDate = new Date("2024-08-18");
      const analytics = await getAnalytics(startDate, endDate, qrCodeId);
      setData(analytics.scansData); // `ScanData[]` type inferred correctly
    };

    fetchData();
  }, [qrCodeId]);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scan Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available for the selected period.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="scans" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ScanActivityChart;