'use client'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import ClientComponent from '@/components/layout/ClientComponent'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/ui/toast'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDocs = pathname?.startsWith('/docs')

  return (
    <html lang="en">
      <body className={inter.className}>
        {isDocs ? (
          children
        ) : (
          <AuthProvider>
            <ToastProvider>
              <ClientComponent>
                {children}
              </ClientComponent>
            </ToastProvider>
          </AuthProvider>
        )}
      </body>
    </html>
  )
}