import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total number of QR codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,050</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">820</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;