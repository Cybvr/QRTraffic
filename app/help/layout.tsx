'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HelpLayout = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Handle search action - you can perform the search or route to a search page here
      console.log('Search term:', searchTerm);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/help" className="flex-shrink-0">
              <img src="/images/logo.png" alt="Logo" width={96} height={96} />
            </Link>
            <nav className="flex space-x-4 text-black text-sm">
              <Link href="/help/support" className="hover:underline">Support</Link>
              <Link href="/help/docs" className="hover:underline">Docs</Link>
              <Link href="/help/docs/release-notes" className="hover:underline">Release Notes</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative max-w-xs w-64">
              <div className="relative flex items-center">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4-4m0 0a7 7 0 10-9.9 9.9 7 7 0 009.9-9.9z"></path>
                </svg>
                <Input
                  type="search"
                  placeholder="Search Help, Docs, Release Notes"
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <Link href="/dashboard">
              <Button variant="default" className="bg-primary text-primary-foreground">
                Back to app
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      
    </div>
  );
};

export default HelpLayout;