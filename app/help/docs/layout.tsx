// @app/help/docs/layout.tsx
'use client';

import '@/styles/globals.css';
import Link from 'next/link';
import React from 'react';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-50 p-6 overflow-y-auto">
        <nav className="space-y-8">
          <div>
            <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Introduction</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="flex items-center text-gray-900 hover:underline">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/product-overview" className="flex items-center text-gray-900 hover:underline">
                  Product Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/features-benefits" className="flex items-center text-gray-900 hover:underline">
                  Features and Benefits
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Getting Started</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/quickstart" className="flex items-center text-gray-900 hover:underline">
                  Quick Start Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/qr-code-types" className="flex items-center text-gray-900 hover:underline">
                  QR Code Types
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Key Features</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/features/qr-generation" className="flex items-center text-gray-900 hover:underline">
                  QR Code Generation
                </Link>
              </li>
              <li>
                <Link href="/docs/features/analytics" className="flex items-center text-gray-900 hover:underline">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/docs/features/customization" className="flex items-center text-gray-900 hover:underline">
                  Customization
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">API Reference</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/api/authentication" className="flex items-center text-gray-900 hover:underline">
                  Authentication
                </Link>
              </li>
              <li>
                <Link href="/docs/api/endpoints" className="flex items-center text-gray-900 hover:underline">
                  Endpoints
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 text-sm font-semibold text-gray-500 uppercase">Additional Information</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/pricing" className="flex items-center text-gray-900 hover:underline">
                  Pricing and Plans
                </Link>
              </li>
              <li>
                <Link href="/docs/privacy-security" className="flex items-center text-gray-900 hover:underline">
                  Privacy and Security
                </Link>
              </li>
              <li>
                <Link href="/docs/support" className="flex items-center text-gray-900 hover:underline">
                  Support and Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DocsLayout;