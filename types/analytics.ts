export interface DataPoint {
  date: string;
  scans?: number;
  users?: number;
}

export interface CityData {
  city: string;
  country: string;
  scans: number;
  percentage: string;
  name: string;  // Added to satisfy the error
  value: number; // Added to satisfy the error
}

export interface MockData {
  scansData: DataPoint[];
  usersData: DataPoint[];
  deviceData: { name: string; value: number }[];
  campaignTypes: { name: string; value: number }[];
  topQRCodes: { name: string; value: number }[];
  cityData: CityData[];
}