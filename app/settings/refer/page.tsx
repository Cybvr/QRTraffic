// app/settings/refer/page.tsx
'use client'

import React, { useState } from 'react'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

export default function ReferFriendSettings() {
  const [referralLink, setReferralLink] = useState('https://qrtraffic.com/ref/yourUniqueCode')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Refer a Friend</h1>
      <p className="text-gray-600 mb-8">Share QRTraffic with your friends and earn rewards!</p>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-medium mb-4">Your referral link</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-grow bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ClipboardDocumentIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">How it works</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Share your unique referral link with friends</li>
          <li>Your friends sign up using your link</li>
          <li>You earn rewards for each successful referral</li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Your referral stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total Referrals</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Successful Referrals</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Rewards Earned</p>
            <p className="text-2xl font-bold">$40</p>
          </div>
        </div>
      </div>
    </div>
  )
}