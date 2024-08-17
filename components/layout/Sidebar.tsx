// components/layout/Sidebar.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HomeIcon, QrCodeIcon, ChartBarIcon, QuestionMarkCircleIcon, Cog6ToothIcon, ChevronDownIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [qrMenuOpen, setQrMenuOpen] = useState(false);

  const toggleQrMenu = () => {
    setQrMenuOpen(!qrMenuOpen);
  }

  return (
    <div className={`hidden lg:flex flex-col h-full transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-100 shadow-lg`}>
      <div className={`flex items-center justify-${isOpen ? 'between' : 'center'} h-16 border-b px-4`}>
        {isOpen && (
          <Image src="/images/logo.png" alt="QRTraffic Logo" width={128} height={128} />
        )}
        <button onClick={toggleSidebar} className="text-gray-500">
          {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
        </button>
      </div>
      <nav className="mt-5 flex-1">
        <Link href="/" className="flex items-center justify-center lg:justify-start px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
          <HomeIcon className="h-5 w-5" />
          <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-width duration-300`}>Home</span>
        </Link>
        <div className="flex flex-col">
          <button onClick={toggleQrMenu} className="flex items-center justify-start w-full px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200 focus:outline-none">
            <QrCodeIcon className="h-5 w-5 flex-shrink-0" />
            <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} text-left`}>QR Codes</span>
            {isOpen && <ChevronDownIcon className="h-3 w-3 ml-auto" />}
          </button>
          {isOpen && qrMenuOpen && (
            <div className="ml-8">
              <Link href="/qr-codes/my-codes" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                <DocumentTextIcon className="h-4 w-4" />
                <span className="ml-2 text-xs">My Codes</span>
              </Link>
              <Link href="/qr-codes/new" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                <PlusIcon className="h-4 w-4" />
                <span className="ml-2 text-xs">New</span>
              </Link>
            </div>
          )}
        </div>
        <Link href="/analytics" className="flex items-center justify-center lg:justify-start px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
          <ChartBarIcon className="h-5 w-5" />
          <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-width duration-300`}>Analytics</span>
        </Link>
        <Link href="/support" className="flex items-center justify-center lg:justify-start px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
          <QuestionMarkCircleIcon className="h-5 w-5" />
          <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-width duration-300`}>Support</span>
        </Link>
        <Link href="/settings/account" className="flex items-center justify-center lg:justify-start px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
          <Cog6ToothIcon className="h-5 w-5" />
          <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-width duration-300`}>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
  