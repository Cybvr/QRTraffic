// components/layout/Sidebar.tsx
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HomeIcon, QrCodeIcon, ChartBarIcon, QuestionMarkCircleIcon, Cog6ToothIcon, ChevronDownIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [qrMenuOpen, setQrMenuOpen] = useState(false);

  return (
    <div className={`hidden lg:flex flex-col h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-gray-100 shadow-lg`}>
      <div className={`flex items-center justify-${isOpen ? 'between' : 'center'} h-16 border-b px-4`}>
        {isOpen && (
          <Image src="/images/logo.png" alt="QRTraffic Logo" width={128} height={128} />
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-gray-500">
          {isOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="mt-5 flex-1">
        <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
          <Link href="/">
            <HomeIcon className="h-5 w-5" />
            <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Home</span>
          </Link>
        </Button>
        <Collapsible open={qrMenuOpen} onOpenChange={setQrMenuOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
              <QrCodeIcon className="h-5 w-5 flex-shrink-0" />
              <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} text-left`}>QR Codes</span>
              {isOpen && <ChevronDownIcon className={`h-3 w-3 ml-auto transition-transform duration-200 ${qrMenuOpen ? 'transform rotate-180' : ''}`} />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-8">
            {isOpen && (
              <>
                <Button asChild variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-200">
                  <Link href="/qr-codes/my-codes">
                    <DocumentTextIcon className="h-4 w-4" />
                    <span className="ml-2 text-xs">My Codes</span>
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-200">
                  <Link href="/qr-codes/new">
                    <PlusIcon className="h-4 w-4" />
                    <span className="ml-2 text-xs">New</span>
                  </Link>
                </Button>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>
        <Button asChild variant="ghost" className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-200">
          <Link href="/analytics">
            <ChartBarIcon className="h-5 w-5" />
            <span className={`${isOpen ? 'ml-3 text-sm' : 'hidden'} transition-all duration-300`}>Analytics</span>
          </Link>
        </Button>
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
      </nav>
    </div>
  )
}

export default Sidebar