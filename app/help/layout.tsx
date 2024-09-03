'use client';

import React from 'react';
import Link from 'next/link';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

const HelpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.png" alt="Logo" width={96} height={96} />
          </Link>
          <nav className="flex space-x-4">
            <Link href="/help" className="text-blue-600">Help</Link>
            <Link href="/help/support" className="text-blue-600">Support</Link>
            <Link href="/help/docs" className="text-blue-600">Docs</Link>
            <Link href="/help/docs/release-notes" className="text-blue-600">Release Notes</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search docs..." className="w-64" />
            <Button variant="outline">Search</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default HelpLayout;