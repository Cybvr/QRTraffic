import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const generateRandomValue = () => Math.floor(Math.random() * 1000) + 500;

const data = [
  { name: 'iOS', value: generateRandomValue() },
  { name: 'Android', value: generateRandomValue() },
  { name: 'Others', value: generateRandomValue() },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const ScansByOS = () => (
  <Card>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-4">Scans by operating system</h3>
      {data.some(item => item.value > 0) ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">Not enough data to show statistics</p>
      )}
    </CardContent>
  </Card>
);

export default ScansByOS;