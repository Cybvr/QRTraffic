import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockOperatingSystems = [
  { name: 'Android', value: 45 },
  { name: 'iOS', value: 40 },
  { name: 'Windows', value: 10 },
  { name: 'macOS', value: 5 },
];

const mockCountries = [
  { name: 'United States', value: 30 },
  { name: 'United Kingdom', value: 25 },
  { name: 'Germany', value: 20 },
  { name: 'France', value: 15 },
  { name: 'Canada', value: 10 },
];

const mockCities = [
  { name: 'New York', value: 20 },
  { name: 'London', value: 18 },
  { name: 'Berlin', value: 15 },
  { name: 'Paris', value: 12 },
  { name: 'Toronto', value: 10 },
];

const StatisticsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Scans by operating system</CardTitle>
        </CardHeader>
        <CardContent>
          {mockOperatingSystems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scans by country</CardTitle>
        </CardHeader>
        <CardContent>
          {mockCountries.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scans by city</CardTitle>
        </CardHeader>
        <CardContent>
          {mockCities.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;