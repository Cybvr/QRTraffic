'use client'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import ClientComponent from '@/components/layout/ClientComponent'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/ui/use-toast'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <ClientComponent>
              {children}
            </ClientComponent>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}