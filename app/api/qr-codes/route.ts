// app/api/qr-codes/route.ts
import { NextResponse } from 'next/server'
import { createQRCode } from '@/services/qrCodeService'

export async function POST(request: Request) {
  const { userId, data } = await request.json()
  if (!userId || !data) {
    return NextResponse.json({ error: 'User ID and QR code data are required' }, { status: 400 })
  }
  try {
    const qrCode = await createQRCode(userId, data)
    return NextResponse.json(qrCode)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}