// File: app/docs/page.tsx

import Link from 'next/link'
import { Book, Zap, Info, Star, List, QrCode, BarChart3, Paintbrush, Key, FileJson, DollarSign, Shield, HeadphonesIcon } from 'lucide-react'

export default function DocsHome() {
  return (
    <div className="container mx-auto px-16 py-2"> {/* Increased padding */}
      <h1 className="text-3xl font-bold mb-6">QRTraffic Documentation</h1>
      <p className="mb-6">Welcome to QRTraffic, your all-in-one platform for QR code generation, management, and analytics. This documentation will help you get started and make the most of our features.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          href="/docs/product-overview"
          title="Introduction"
          icon={<Info className="h-8 w-8 text-blue-600" />}
          description="Overview, Product Overview, Features and Benefits"
        />
        <Card
          href="/docs/quickstart"
          title="Getting Started"
          icon={<Zap className="h-8 w-8 text-blue-600" />}
          description="Quick Start Guide, QR Code Types"
        />
        <Card
          href="/docs/features/qr-generation"
          title="Key Features"
          icon={<QrCode className="h-8 w-8 text-blue-600" />}
          description="QR Code Generation, Analytics, Customization"
        />
        <Card
          href="/docs/api/authentication"
          title="API Reference"
          icon={<Key className="h-8 w-8 text-blue-600" />}
          description="Authentication, Endpoints"
        />
        <Card
          href="/docs/pricing"
          title="Additional Information"
          icon={<DollarSign className="h-8 w-8 text-blue-600" />}
          description="Pricing and Plans, Privacy and Security, Support and Contact"
        />
      </div>
    </div>
  )
}

function Card({ href, title, icon, description }) {
  return (
    <Link href={href} className="block p-4 rounded-lg shadow-sm bg-white border border-gray-200 h-48 flex flex-col justify-between">
      <div className="flex flex-col items-start mb-1">
        <div className="mb-2">{icon}</div> {/* Icon on top */}
        <h2 className="font-semibold text-lg text-gray-900">{title}</h2> {/* Reduced title size */}
      </div>
      <p className="text-gray-700 text-sm mt-2">{description}</p>
    </Link>
  )
}