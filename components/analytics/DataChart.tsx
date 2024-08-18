"use client"

import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3Icon, LineChartIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataPoint } from '@/types/DataPoint';

interface DataChartProps {
  title: string;
  data: DataPoint[];
  dataKey: 'scans' | 'users';
  total: number;
  increase: number;
  previousTotal: number;
  dateRange: string;
}

export function DataChart({ 
  title, 
  data, 
  dataKey, 
  total, 
  increase, 
  previousTotal, 
  dateRange 
}: DataChartProps) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [timeframe, setTimeframe] = useState('7days');

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">{title}</CardTitle>
        <div className="flex space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant={chartType === 'bar' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setChartType('bar')}
          >
            <BarChart3Icon className="h-4 w-4" />
          </Button>
          <Button 
            variant={chartType === 'line' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setChartType('line')}
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                />
                <Bar 
                  dataKey={dataKey} 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p className="font-semibold">
            {title}: {total.toLocaleString()} 
            <span className="text-green-500 ml-2">
              ↑ {increase}%
            </span>
          </p>
          <p className="text-sm text-muted-foreground">{dateRange}</p>
          <p className="font-semibold mt-2">
            Previous {title.toLowerCase()}: {previousTotal.toLocaleString()} 
            <span className="text-green-500 ml-2">
              ↑ {increase}%
            </span>
          </p>
          <p className="text-sm text-muted-foreground">{dateRange}</p>
        </div>
      </CardContent>
    </Card>
  );
}