// File: app/settings/refer/page.tsx

'use client'

import React, { useState } from 'react'
import { ClipboardListIcon } from 'lucide-react' // Correct the import
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function ReferFriendSettings() {
  const [referralLink, setReferralLink] = useState('https://qrtraffic.com/ref/yourUniqueCode')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Refer a Friend</h1>
        <p className="text-muted-foreground">Share QRTraffic with your friends and earn rewards!</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Your referral link</CardTitle>
          <CardDescription>Share your unique referral link with friends.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input readOnly value={referralLink} className="flex-grow" />
            <Button onClick={handleCopyLink} variant="default">
              <ClipboardListIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2">
            <li>Share your unique referral link with friends</li>
            <li>Your friends sign up using your link</li>
            <li>You earn rewards for each successful referral</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your referral stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Total Referrals</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Successful Referrals</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Rewards Earned</p>
            <p className="text-2xl font-bold">$40</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}