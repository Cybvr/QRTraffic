// app/layout.tsx
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import ClientComponent from '@/components/layout/ClientComponent' // New import for client logic

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QRTraffic',
  description: 'Generate and manage QR codes with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  )
}