'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RecentQRCodes from '@/components/common/RecentQRCodes'
import { auth } from '@/lib/firebase'

type User = {
  email: string;
  displayName?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = auth.currentUser
      if (currentUser) {
        setUser({
          email: currentUser.email!,
          displayName: currentUser.displayName || undefined
        })
      } else {
        router.push('/auth/login')
      }
      setLoading(false)
    }
    checkAuth()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const firstName = user.displayName?.split(' ')[0] || user.email?.split('@')[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Good morning, {firstName}! 👋</h1>
        <p className="text-muted-foreground">Here is a summary of your QR code campaigns.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Codes</CardTitle>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Total QR Codes</p>
            <p className="text-xs text-muted-foreground mt-2">Linkpages Create your own link-in-bio page</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,476</div>
            <p className="text-xs text-green-500 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              15% than the previous month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">758</div>
            <p className="text-xs text-green-500 flex items-center">
              <ArrowUpIcon className="h-4 w-4 mr-1" />
              20% than the previous month
            </p>
          </CardContent>
        </Card>
      </div>
      <RecentQRCodes />
    </div>
  )
}
