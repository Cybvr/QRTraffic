'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register';

  return (
    <div className="flex h-screen overflow-hidden">
      {!isAuthPage && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!isAuthPage && <Header toggleSidebar={toggleSidebar} />}
        <main className="flex-1 overflow-auto p-4 sm:p-4 md:p-4 lg:p-12 xl:p-12 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ClientComponent