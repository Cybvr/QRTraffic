'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CompanySettings() {
  const [publicProfile, setPublicProfile] = useState('QR Traffic UI')
  const [profileUrl, setProfileUrl] = useState('QR Traffic')
  const [tagline, setTagline] = useState('QR Traffic UI is the ultimate Figma UI kit and design system to kickstart any project, startup, or freelance designer.')
  const [reportsEnabled, setReportsEnabled] = useState(false)
  const [emailsEnabled, setEmailsEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company profile</h1>
        <p className="text-muted-foreground">Update your company photo and details here.</p>
      </div>

      <Separator />

      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your company&apos;s public profile and details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="public-profile">Public profile</Label>
              <Input id="public-profile" value={publicProfile} onChange={(e) => setPublicProfile(e.target.value)} />
              <p className="text-sm text-muted-foreground">This will be displayed on your profile.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-url">Profile URL</Label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  qrtraffic.com/profile/
                </span>
                <Input id="profile-url" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} className="rounded-l-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Textarea id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
              <p className="text-sm text-muted-foreground">A quick snapshot of your company.</p>
            </div>
            <div className="space-y-2">
              <Label>Company logo</Label>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  Logo
                </div>
                <Button variant="outline">Change</Button>
              </div>
              <p className="text-sm text-muted-foreground">Update your company logo and then choose where you want it to display.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Add your logo to reports and emails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reports">Reports</Label>
                <p className="text-sm text-muted-foreground">Include my logo in summary reports.</p>
              </div>
              <Switch id="reports" checked={reportsEnabled} onCheckedChange={setReportsEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emails">Emails</Label>
                <p className="text-sm text-muted-foreground">Include my logo in customer emails.</p>
              </div>
              <Switch id="emails" checked={emailsEnabled} onCheckedChange={setEmailsEnabled} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}