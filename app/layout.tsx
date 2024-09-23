'use client'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/ui/toast'
import { usePathname } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
      <Head>
        <title>Your App Name</title>
        <meta name="description" content="Your app description here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://qrtraffic.com/" />
        <meta property="og:title" content="QRTraffic" />
        <meta property="og:description" content="Create, customise, and track QR codes effortlessly" />
        <meta property="og:image" content="/favicon.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://qrtraffic.com/" />
        <meta property="twitter:title" content="QRTraffic" />
        <meta property="twitter:description" content="Create, customise, and track QR codes effortlessly" />
        <meta property="twitter:image" content="/favicon.png" />
      </Head>
      <body className={inter.className}>
        {isDocs ? (
          children
        ) : (
          <AuthProvider>
            <ToastProvider>
              <Elements stripe={stripePromise}>
                {isAuthPage ? (
                  children
                ) : (
                  <div className="flex h-screen overflow-hidden">
                    <div className="flex flex-col flex-1 overflow-hidden">
                      {children}
                    </div>
                  </div>
                )}
              </Elements>
            </ToastProvider>
          </AuthProvider>
        )}
      </body>
    </html>
  )
}