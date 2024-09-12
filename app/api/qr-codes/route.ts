import { NextResponse } from 'next/server'
import { createQRCode } from '@/services/api/api'

export async function POST(request: Request) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const qrCode = await createQRCode(url)
    return NextResponse.json(qrCode)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}