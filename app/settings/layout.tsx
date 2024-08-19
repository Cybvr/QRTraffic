'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsLinks = [
  { href: '/settings/account', label: 'Account' },
  { href: '/settings/company', label: 'Company' },
  { href: '/settings/plan-billing', label: 'Plan & Billing' },
  { href: '/settings/members', label: 'Members' },
  { href: '/settings/refer', label: 'Refer a friend' },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = settingsLinks.find(link => pathname.startsWith(link.href))?.href || '/settings/account'

  return (
    <div className="space-y-6">
      <div className="border-b">
        <div className="container mx-auto">
          <Tabs value={currentTab} onValueChange={(value) => router.push(value)}>
            <TabsList className="h-16">
              {settingsLinks.map((link) => (
                <TabsTrigger 
                  key={link.href} 
                  value={link.href}
                  className="text-sm font-medium"
                >
                  {link.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="container mx-auto py-5 px-4 sm:py-6 sm:px-2">
        {children}
      </div>
    </div>
  )
}