// app/api/qr-scan/route.ts
import { NextResponse } from 'next/server';
import { saveQRScan } from '@/services/qrCodeService';
import { Timestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { qrCodeId, userLocation, deviceType, campaignType, city, country } = await request.json();

    await saveQRScan({
      date: Timestamp.fromDate(new Date()),
      qrCodeId,
      userLocation,
      deviceType,
      campaignType,
      city,
      country,
      userId: 'anonymous' // Replace with actual user ID if available
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving QR scan:', error);
    return NextResponse.json({ error: 'Failed to save QR scan' }, { status: 500 });
  }
}