// components/layout/Sidebar.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon, QrCodeIcon, ChartBarIcon, QuestionMarkCircleIcon, Cog6ToothIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`hidden lg:flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-[#ebe8e9] shadow-lg`}>
      <div className={`flex items-center justify-${isOpen ? 'between' : 'center'} h-16 border-b px-4`}>
        {isOpen && (
          <Image src="/images/logo.png" alt="QRTraffic Logo" width={128} height={128} />
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-gray-500">
          {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="mt-5 flex-1 flex flex-col">
        <div>
          <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
            <Link href="/">
              <HomeIcon className="h-5 w-5" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Home</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
            <Link href="/qr-codes/my-codes">
              <DocumentTextIcon className="h-5 w-5" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>My Codes</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
            <Link href="/qr-codes/new">
              <PlusIcon className="h-5 w-5" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>New QR Code</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
            <Link href="/analytics">
              <ChartBarIcon className="h-5 w-5" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Analytics</span>
            </Link>
          </Button>
        </div>
        <div className="mt-auto">
          <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
            <Link href="/support">
              <QuestionMarkCircleIcon className="h-5 w-5" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Support</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
            <Link href="/settings/account">
              <Cog6ToothIcon className="h-5 w-5" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Settings</span>
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar