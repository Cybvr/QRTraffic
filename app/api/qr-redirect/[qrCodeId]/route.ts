// app/api/qr-redirect/[qrCodeId]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { qrCodeId: string } }) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');
  const qrCodeId = params.qrCodeId;

  if (!target) {
    return NextResponse.json({ error: 'No target URL provided' }, { status: 400 });
  }

  // Call the QR scan API
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        qrCodeId,
        deviceType: 'web', // You can improve this by detecting the actual device type
        campaignType: 'default', // Update this as needed
        city: 'Unknown', // You can use a geolocation service to get this information
        country: 'Unknown',
      }),
    });
  } catch (error) {
    console.error('Error logging QR scan:', error);
  }

  // Redirect to the target URL
  return NextResponse.redirect(target);
}