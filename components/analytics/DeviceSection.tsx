// components/analytics/DeviceSection.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DeviceData {
  name: string;
  value: number;
}

interface DeviceSectionProps {
  deviceData: DeviceData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DeviceSection: React.FC<DeviceSectionProps> = ({ deviceData }) => {
  const total = deviceData.reduce((sum, device) => sum + device.value, 0);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Device Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} (${((value as number / total) * 100).toFixed(2)}%)`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {deviceData.map((device, index) => (
            <div key={device.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{device.name}</span>
              </div>
              <span>{((device.value / total) * 100).toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceSection;