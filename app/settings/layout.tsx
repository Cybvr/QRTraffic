'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const PieChart = dynamic(() => import('recharts/lib/chart/PieChart').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts/lib/polar/Pie').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts/lib/component/Cell').then(mod => mod.Cell), { ssr: false });

const deviceData = [
  { name: 'Mobile', value: 400 },
  { name: 'Desktop', value: 300 },
  { name: 'Tablet', value: 200 },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex space-x-4">
        <div className="w-64 h-64">
          <PieChart width={250} height={250}>
            <Pie
              data={deviceData}
              cx={125}
              cy={125}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}