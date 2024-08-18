import { supabase } from './supabase'

// Define a type for the expected return value
type QRCodeData = {
  id: number;
  url: string;
  created_at: string;
}

export const createQRCode = async (url: string): Promise<QRCodeData> => {
  // Simulate the Supabase query
  const mockData: QRCodeData = {
    id: 1,
    url,
    created_at: new Date().toISOString()
  };

  // Simulate an asynchronous operation
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 100);
  });
}