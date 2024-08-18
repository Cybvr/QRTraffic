'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const settingsLinks = [
  { href: '/settings/account', label: 'Account' },
  { href: '/settings/company', label: 'Company' },
  { href: '/settings/plan-billing', label: 'Plan & Billing' },
  { href: '/settings/members', label: 'Members' },
  { href: '/settings/refer', label: 'Refer a friend' },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 sm:px-2">
          <div className="hidden md:flex items-center space-x-4 lg:space-x-2">
            {settingsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="relative md:hidden w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>Settings</span>
                  {isOpen ? (
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-10 w-full left-0">
                {settingsLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`block w-full px-4 py-2 text-sm ${
                        pathname === link.href ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100 hover:text-gray-900`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-5 px-4 sm:py-6 sm:px-2">
        {children}
      </div>
    </div>
  )
}