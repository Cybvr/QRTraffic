import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '18 Jul', scans: 0 },
  { date: '25 Jul', scans: 0 },
  { date: '01 Aug', scans: 0 },
  { date: '08 Aug', scans: 0 },
  { date: '15 Aug', scans: 0 },
];

const ScanActivityChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="scans" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default ScanActivityChart;