'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon, 
  Bars3Icon, 
  ChevronDownIcon, 
  UserIcon, 
  Cog6ToothIcon, 
  UserPlusIcon, 
  QuestionMarkCircleIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/AuthContext'
import { getQRCodeCount } from '@/services/qrCodeService'
import { PricingPopup } from "@/components/dashboard/PricingPopup"

const dropdownItems = [
  { label: 'Account', href: '/dashboard/settings/account', icon: UserIcon },
  { label: 'Plan & Billing', href: '/dashboard/settings/plan-billing', icon: Cog6ToothIcon },
  { label: 'Refer a Friend', href: '/dashboard/settings/refer', icon: UserPlusIcon },
  { label: 'Support', href: '/dashboard/help', icon: QuestionMarkCircleIcon },
  { label: 'Logout', href: '/dashboard/auth/logout', icon: ArrowRightOnRectangleIcon },
]

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [qrMenuOpen, setQrMenuOpen] = useState(false)
  const [qrCodeCount, setQRCodeCount] = useState(0)
  const { user } = useAuth()
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchQRCodeCount = async () => {
      if (user) {
        const count = await getQRCodeCount(user.uid)
        setQRCodeCount(count)
      }
    }
    fetchQRCodeCount()
  }, [user])

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen(prev => !prev)
    setQrMenuOpen(false)
  }, [])

  const toggleQrMenu = useCallback(() => {
    setQrMenuOpen(prev => !prev)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileNavOpen(false)
        setQrMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-background shadow-sm z-10" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileNav} className="lg:hidden mr-3">
              <Bars3Icon className="h-6 w-6" />
            </Button>
            <div className="w-full max-w-lg lg:max-w-xs">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search" className="pl-8" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                {qrCodeCount}/5 Codes
              </div>
              <PricingPopup currentPlan={user?.plan || 'free'}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Upgrade Plan
                </Button>
              </PricingPopup>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full bg-secondary">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User Avatar" className="rounded-full h-8 w-8" />
                  ) : (
                    <span>{user?.displayName?.[0] || "JD"}</span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName || 'John Doe'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || 'john.doe@example.com'}</p>
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
        <div className="lg:hidden bg-background shadow-lg">
          <nav className="px-4 py-2 space-y-1">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">Home</Link>
            <div>
              <Button variant="ghost" onClick={toggleQrMenu} className="w-full justify-between px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
                QR Codes 
                <ChevronDownIcon className="h-5 w-5 ml-2" />
              </Button>
              {qrMenuOpen && (
                <div className="ml-4 space-y-1">
                  <Link href="/qr-codes/my-codes" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">My Codes</Link>
                  <Link href="/qr-codes/new" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">New</Link>
                </div>
              )}
            </div>
            <Link href="/analytics" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">Analytics</Link>
            <Link href="/support" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground">Support</Link>
            <PricingPopup currentPlan={user?.plan || 'free'}>
              <div className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                Plan & Billing
              </div>
            </PricingPopup>
          </nav>
        </div>
      )}
    </header>
  )
}