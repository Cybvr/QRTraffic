import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface MenuToolProps {
  setQRCodeData: (data: string) => void
}

export default function MenuTool({ setQRCodeData }: MenuToolProps) {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuUrl, setMenuUrl] = useState('')

  const handleGenerate = () => {
    const menuData = `${restaurantName}\n${menuUrl}`
    setQRCodeData(menuData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Setup</CardTitle>
          <CardDescription>Create a QR code for your restaurant menu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Restaurant Name"
          />
          <Input
            type="url"
            value={menuUrl}
            onChange={(e) => setMenuUrl(e.target.value)}
            placeholder="Menu URL"
          />
          <Button onClick={handleGenerate} className="w-full">
            Generate QR Code
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}