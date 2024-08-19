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
      <div className="border-b overflow-x-auto">
        <Tabs value={currentTab} onValueChange={(value) => router.push(value)} className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-start p-0 w-max">
            {settingsLinks.map((link) => (
              <TabsTrigger 
                key={link.href} 
                value={link.href}
                className="px-4 py-2 text-sm font-medium whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                {link.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="px-4">
        {children}
      </div>
    </div>
  )
}