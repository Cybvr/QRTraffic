// app/api/qr-redirect/[qrCodeId]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { qrCodeId: string } }) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');
  const qrCodeId = params.qrCodeId;
  if (!target) {
    return NextResponse.json({ error: 'No target content provided' }, { status: 400 });
  }

  try {
    const content = JSON.parse(decodeURIComponent(target));

    // Call the QR scan API
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

    // Handle the redirect based on the QR code type
    switch (content.type) {
      case 'Link':
        return NextResponse.redirect(content.url);
      case 'VCard':
      case 'Business Page':
      case 'Restaurants Menu':
      case 'Facebook':
      case 'WiFi':
        // For these types, you might want to redirect to a page that displays the content
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/qr-display/${qrCodeId}`);
      default:
        return NextResponse.json({ error: 'Invalid QR code type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing QR code redirect:', error);
    return NextResponse.json({ error: 'Failed to process QR code' }, { status: 500 });
  }
}