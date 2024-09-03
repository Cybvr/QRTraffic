// app/settings/account/page.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from '@/lib/firebase'
import { reauthenticateWithCredential, EmailAuthProvider, updateProfile, deleteUser, updatePassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function AccountSettings() {
  const [firstName, setFirstName] = useState('Olivia')
  const [lastName, setLastName] = useState('Rhye')
  const [email, setEmail] = useState('olivia@qrtraffic.com')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleUpdateProfile = async () => {
    try {
      const displayName = `${firstName} ${lastName}`
      const user = auth.currentUser
      if (user) {
        await updateProfile(user, { displayName })
        console.log("Profile updated successfully")
      } else {
        console.error("No user is currently signed in.")
      }
    } catch (error) {
      console.error("Error updating profile", error)
    }
  }

  const handleDeleteAccount = async () => {
    const user = auth.currentUser
    try {
      if (user) {
        await deleteUser(user)
        console.log("User account deleted")
        router.push('/auth/register')
      } else {
        console.error("No user is currently signed in.")
      }
    } catch (error) {
      console.error("Error deleting user", error)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match")
      return
    }

    try {
      const user = auth.currentUser
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword)
        await reauthenticateWithCredential(user, credential)
        await updatePassword(user, newPassword)
        console.log("Password updated successfully")
        auth.signOut()
        router.push('/auth/login')
      } else {
        console.error("No user is currently signed in or user email is null.")
      }
    } catch (error) {
      console.error("Error updating password", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Personal info</h1>
        <p className="text-muted-foreground">Update your photo and personal details.</p>
      </div>
      <Separator />
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" value={email} readOnly />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleUpdateProfile}>Save changes</Button>
          </CardFooter>
        </Card>
      </form>
      <Separator />
      <form onSubmit={handleResetPassword} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Update password</Button>
          </CardFooter>
        </Card>
      </form>
      <Separator />
      <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
    </div>
  )
}