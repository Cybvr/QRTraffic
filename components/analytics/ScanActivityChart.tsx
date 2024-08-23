import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '18 Jul', scans: 0 },
  { date: '25 Jul', scans: 0 },
  { date: '01 Aug', scans: 0 },
  { date: '08 Aug', scans: 0 },
  { date: '15 Aug', scans: 0 },
];

const ScanActivityChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Scan Activity</CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-[color:var(--muted-foreground)]" />
          <XAxis 
            dataKey="date" 
            stroke="var(--foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="scans" 
            stroke="var(--chart-2)" 
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--chart-2)" }}
            activeDot={{ r: 8, fill: "var(--chart-2)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default ScanActivityChart;