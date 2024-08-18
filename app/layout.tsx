// app/layout.tsx
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientComponent from '@/components/layout/ClientComponent'

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
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  )
}