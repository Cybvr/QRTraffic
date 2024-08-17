// components/layout/Header.tsx
"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  BellIcon, MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon, 
  UserIcon, Cog6ToothIcon, BuildingOfficeIcon, UsersIcon, 
  UserPlusIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'

const dropdownItems = [
  { label: 'View Profile', href: '#', icon: UserIcon },
  { label: 'Settings', href: '#', icon: Cog6ToothIcon },
  { label: 'Company Profile', href: '#', icon: BuildingOfficeIcon },
  { label: 'Members', href: '#', icon: UsersIcon },
  { label: 'Refer a Friend', href: '#', icon: UserPlusIcon },
  { label: 'Support', href: '#', icon: QuestionMarkCircleIcon },
  { label: 'Logout', href: '#', icon: ArrowRightOnRectangleIcon },
];

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [qrMenuOpen, setQrMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(prev => !prev);
    setMobileNavOpen(false);
    setQrMenuOpen(false);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(prev => !prev);
    setDropdownOpen(false);
    setQrMenuOpen(false);
  }, []);

  const toggleQrMenu = useCallback(() => {
    setQrMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdownOpen(false);
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
            <button onClick={toggleMobileNav} className="text-gray-500 lg:hidden focus:outline-none mr-3">
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="ml-3 relative">
              <button onClick={toggleDropdown} className="max-w-xs bg-gray-200 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
                  JD
                </div>
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center px-4 py-2 border-b border-gray-100">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-600">
                      JD
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@example.com</p>
                    </div>
                  </div>
                  {dropdownItems.map((item, index) => (
                    <Link key={index} href={item.href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <item.icon className="h-5 w-5 mr-3 text-gray-400" aria-hidden="true" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {mobileNavOpen && (
        <div className="lg:hidden bg-white shadow-lg mt-2">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
            Home
          </Link>
          <button onClick={toggleQrMenu} className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-left">
            QR Codes
            <ChevronDownIcon className="h-5 w-5 inline-block ml-2" />
          </button>
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