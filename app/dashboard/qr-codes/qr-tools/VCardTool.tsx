import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface VCardToolProps {
  setQRCodeData: (data: any) => void
}

export default function VCardTool({ setQRCodeData }: VCardToolProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')

  const handleGenerate = () => {
    const vCardData = {
      firstName,
      lastName,
      phone,
      email,
      company,
      title,
      name: `${firstName} ${lastName} VCard`
    }
    setQRCodeData(vCardData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Setup</CardTitle>
          <CardDescription>Create a QR code for your contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
          />
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleGenerate}>
            Generate QR Code
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}