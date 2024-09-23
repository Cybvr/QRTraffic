import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WiFiToolProps {
  setQRCodeData: (data: any) => void
}

export default function WiFiTool({ setQRCodeData }: WiFiToolProps) {
  const [ssid, setSSID] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA')

  const handleGenerate = () => {
    const wifiData = {
      ssid,
      password,
      encryption,
      name: `WiFi: ${ssid}`
    }
    setQRCodeData(wifiData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Setup</CardTitle>
        <CardDescription>Create a QR code for WiFi access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          value={ssid}
          onChange={(e) => setSSID(e.target.value)}
          placeholder="Network Name (SSID)"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Select value={encryption} onValueChange={setEncryption}>
          <SelectTrigger>
            <SelectValue placeholder="Select encryption" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WPA">WPA/WPA2</SelectItem>
            <SelectItem value="WEP">WEP</SelectItem>
            <SelectItem value="nopass">No Encryption</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleGenerate}>
          Generate QR Code
        </Button>
      </CardFooter>
    </Card>
  )
}