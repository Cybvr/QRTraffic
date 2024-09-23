// app/api/generate-qr/route.ts
import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: Request) {
  try {
    const { content, qrCodeId } = await request.json();
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/qr-redirect/${qrCodeId}?target=${encodeURIComponent(JSON.stringify(content))}`;
    const qrCodeData = await QRCode.toDataURL(redirectUrl);
    return NextResponse.json({ qrCodeData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate QR Code' }, { status: 500 });
  }
}