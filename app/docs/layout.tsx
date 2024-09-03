// File: app/docs/layout.tsx

import '@/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Book, Zap, QrCode, BarChart3, Paintbrush, Key, FileJson, Info, Star, List, DollarSign, Shield, HeadphonesIcon } from 'lucide-react'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="QRTraffic Logo" width={96} height={96} />
          </Link>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search docs..." className="w-64" />
            <Button variant="outline">Search</Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-50 p-6 overflow-y-auto">
          <nav className="space-y-8">
            <div>
              <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Introduction</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="flex items-center text-gray-900 hover:underline">
                    <Book className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Overview</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/product-overview" className="flex items-center text-gray-900 hover:underline">
                    <Info className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Product Overview</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/features-benefits" className="flex items-center text-gray-900 hover:underline">
                    <Star className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Features and Benefits</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Getting Started</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/quickstart" className="flex items-center text-gray-900 hover:underline">
                    <Zap className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Quick Start Guide</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/qr-code-types" className="flex items-center text-gray-900 hover:underline">
                    <List className="mr-2 h-4 w-4 text-blue-600" />
                    <span>QR Code Types</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Key Features</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/features/qr-generation" className="flex items-center text-gray-900 hover:underline">
                    <QrCode className="mr-2 h-4 w-4 text-blue-600" />
                    <span>QR Code Generation</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/features/analytics" className="flex items-center text-gray-900 hover:underline">
                    <BarChart3 className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Analytics</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/features/customization" className="flex items-center text-gray-900 hover:underline">
                    <Paintbrush className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Customization</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">API Reference</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/api/authentication" className="flex items-center text-gray-900 hover:underline">
                    <Key className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Authentication</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/api/endpoints" className="flex items-center text-gray-900 hover:underline">
                    <FileJson className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Endpoints</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Additional Information</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/pricing" className="flex items-center text-gray-900 hover:underline">
                    <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Pricing and Plans</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/privacy-security" className="flex items-center text-gray-900 hover:underline">
                    <Shield className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Privacy and Security</span>
                  </Link>
                </li>
                <li>
                  <Link href="/docs/support" className="flex items-center text-gray-900 hover:underline">
                    <HeadphonesIcon className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Support and Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-10 bg-white"> {/* Increased padding here */}
          {children}
        </main>
      </div>
    </div>
  )
}