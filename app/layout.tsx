'use client'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from './components/ui/toast'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDocs = pathname?.startsWith('/docs')
  const isAuthPage = ['/auth/login', '/auth/register', '/auth/reset-password', '/auth/forgot-password'].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isDocs ? (
          children
        ) : (
          <AuthProvider>
            <ToastProvider>
              {isAuthPage ? (
                children
              ) : (
                <div className="flex h-screen overflow-hidden">
                  <div className="flex flex-col flex-1 overflow-hidden">
                    {children}
                  </div>
                </div>
              )}
            </ToastProvider>
          </AuthProvider>
        )}
      </body>
    </html>
  )
}