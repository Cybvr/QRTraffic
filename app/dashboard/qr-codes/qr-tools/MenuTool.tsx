import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface MenuToolProps {
  setQRCodeData: (data: any) => void
}

export default function MenuTool({ setQRCodeData }: MenuToolProps) {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuUrl, setMenuUrl] = useState('')

  const handleGenerate = () => {
    const menuData = {
      restaurantName,
      menuUrl,
      name: `${restaurantName} Menu`
    }
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