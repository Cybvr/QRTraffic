'use client'

import { useAuth } from '@/context/AuthContext'
import Header from '@/app/dashboard/common/Header'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon, QrCodeIcon, ChartBarIcon, QuestionMarkCircleIcon, Cog6ToothIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from "@/app/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {user && (
        <div className={`hidden lg:flex flex-col h-full transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#ebe8e9] shadow-lg`}>
          <div className={`flex items-center justify-${isSidebarOpen ? 'between' : 'center'} h-16 border-b px-4`}>
            {isSidebarOpen && (
              <Image src="/images/logo.png" alt="QRTraffic Logo" width={128} height={128} />
            )}
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-gray-500">
              {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
            </Button>
          </div>
          <nav className="mt-5 flex-1 flex flex-col">
            <div>
              <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
                <Link href="/dashboard">
                  <HomeIcon className="h-5 w-5" />
                  <span className={`${isSidebarOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Home</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
                <Link href="/dashboard/qr-codes/my-codes">
                  <DocumentTextIcon className="h-5 w-5" />
                  <span className={`${isSidebarOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>My Codes</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
                <Link href="/dashboard/qr-codes/new">
                  <PlusIcon className="h-5 w-5" />
                  <span className={`${isSidebarOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>New QR Code</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
                <Link href="/dashboard/analytics">
                  <ChartBarIcon className="h-5 w-5" />
                  <span className={`${isSidebarOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Analytics</span>
                </Link>
              </Button>
            </div>
            <div className="mt-auto">
              <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
                <Link href="/support">
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                  <span className={`${isSidebarOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Support</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
                <Link href="/dashboard/settings/account">
                  <Cog6ToothIcon className="h-5 w-5" />
                  <span className={`${isSidebarOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Settings</span>
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
      <div className="flex flex-col flex-1 overflow-hidden">
        {user && <Header />}
        <main className="flex-1 overflow-auto p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}