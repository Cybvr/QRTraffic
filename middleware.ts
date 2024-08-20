import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    return NextResponse.redirect(redirectUrl)
  }
  if (session && (req.nextUrl.pathname === '/auth/login' || req.nextUrl.pathname === '/auth/register')) {
    console.log('Redirecting to dashboard')
    const redirectUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(redirectUrl)
  }
  return res
}
export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/register'],
}