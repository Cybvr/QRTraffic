// app/settings/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const settingsLinks = [
  { href: '/settings/account', label: 'Account' },
  { href: '/settings/company', label: 'Company' },
  { href: '/settings/domains', label: 'Domains' },
  { href: '/settings/plan-billing', label: 'Plan & Billing' },
  { href: '/settings/members', label: 'Members' },
  { href: '/settings/refer', label: 'Refer a friend' },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {settingsLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <ChevronDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle Settings Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                {settingsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="container mx-auto py-10">
        {children}
      </div>
    </div>
  )
}