'use client'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/components/ui/toast'
import { usePathname } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const inter = Inter({ subsets: ['latin'] })

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
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