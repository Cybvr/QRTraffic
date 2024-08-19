"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon, 
  UserIcon, Cog6ToothIcon, BuildingOfficeIcon, UsersIcon, 
  UserPlusIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const dropdownItems = [
  { label: 'Account', href: '/settings/account', icon: UserIcon },
  { label: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { label: 'Refer a Friend', href: '/settings/refer', icon: UserPlusIcon },
  { label: 'Support', href: '/support', icon: QuestionMarkCircleIcon },
  { label: 'Logout', href: '/auth/logout', icon: ArrowRightOnRectangleIcon },
];

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [qrMenuOpen, setQrMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(prev => !prev);
    setQrMenuOpen(false);
  }, []);

  const toggleQrMenu = useCallback(() => {
    setQrMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileNavOpen(false);
        setQrMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm z-10 h-16" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex-1 flex items-center h-full">
            <Button variant="ghost" size="icon" onClick={toggleMobileNav} className="lg:hidden mr-3">
              <Bars3Icon className="h-6 w-6" />
            </Button>
            <div className="w-full max-w-lg lg:max-w-xs">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full bg-gray-200">
                  <span className="sr-only">Open user menu</span>
                  JD
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdownItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {mobileNavOpen && (
        <div className="lg:hidden bg-white shadow-lg mt-2">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Home
          </Link>
          <Button 
            variant="ghost" 
            onClick={toggleQrMenu} 
            className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            QR Codes
            <ChevronDownIcon className="h-5 w-5 ml-2" />
          </Button>
          {qrMenuOpen && (
            <div className="ml-6">
              <Link href="/qr-codes/my-codes" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                My Codes
              </Link>
              <Link href="/qr-codes/new" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                New
              </Link>
            </div>
          )}
          <Link href="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Analytics
          </Link>
          <Link href="/support" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Support
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Settings
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
