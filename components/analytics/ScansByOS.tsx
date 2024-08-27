import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getAnalytics } from '@/services/qrCodeService';

const COLORS = ['var(--chart-4)', 'var(--chart-5)', 'var(--chart-2)'];

const ScansByOS = ({ qrCodeId }) => {
  const [osData, setOsData] = useState([]);

  useEffect(() => {
    const fetchOsData = async () => {
      const startDate = new Date("2024-07-18");
      const endDate = new Date("2024-08-18");
      const analyticsData = await getAnalytics(startDate, endDate, qrCodeId);
      setOsData(Object.entries(analyticsData.deviceData).map(([deviceType, value]) => ({ name: deviceType, value })));
    };

    fetchOsData();
  }, [qrCodeId]);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Scans by Operating System</h3>
        {osData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={osData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="var(--chart-1)"
                dataKey="value"
                label
              >
                {osData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">Not enough data to show statistics</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ScansByOS;