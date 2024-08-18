import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-grow p-4 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout