import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const qrCodeData = await QRCode.toDataURL(text);
    return NextResponse.json({ qrCodeData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate QR Code' }, { status: 500 });
  }
}