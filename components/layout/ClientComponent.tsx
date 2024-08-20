'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { useAuth } from '@/context/AuthContext'

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const isAuthPage = ['/auth/login', '/auth/register', '/auth/reset-password', '/auth/forgot-password'].includes(pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {user && !isAuthPage && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {user && !isAuthPage && <Header toggleSidebar={toggleSidebar} />}
        <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-4 lg:p-6 lg:pt-2 xl:p-6 xl:pt-2 bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ClientComponent