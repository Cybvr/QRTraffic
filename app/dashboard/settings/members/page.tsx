// app/settings/members/page.tsx
'use client'

import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

interface Member {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
}

export default function MembersSettings() {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'John Doe', email: 'john@qrtraffic.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@qrtraffic.com', role: 'Editor' },
  ])

  const [newMemberEmail, setNewMemberEmail] = useState('')

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send an API request to invite the member
    console.log('Inviting member:', newMemberEmail)
    setNewMemberEmail('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Team Members</h1>
      <p className="text-gray-600 mb-8">Manage your team members and their access levels.</p>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Invite new member</h2>
        <form onSubmit={handleInviteMember} className="flex items-center space-x-4">
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Invite
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Current members</h2>
        <ul className="divide-y divide-gray-200">
          {members.map((member) => (
            <li key={member.id} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-500">{member.role}</span>
                <select
                  className="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={member.role}
                  onChange={(e) => {
                    // Here you would typically send an API request to update the member's role
                    console.log('Updating role for', member.name, 'to', e.target.value)
                  }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}