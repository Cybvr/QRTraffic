"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from '@/lib/firebase'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [actionCode, setActionCode] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Extract the action code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('oobCode');
    if (code) {
      setActionCode(code);
      // Verify the password reset code is valid
      verifyPasswordResetCode(auth, code).catch((error) => {
        setError('Invalid or expired action code. Please try resetting your password again.');
        console.error('Error verifying reset code:', error);
      });
    } else {
      setError('No reset code found. Please try resetting your password again.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      await confirmPasswordReset(auth, actionCode, password)
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 3000)
    } catch (error) {
      setError('Failed to reset password. Please try again.')
      console.error('Error resetting password:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <Image src="/images/logo.svg" alt="Logo" width={100} height={100} className="mx-auto mb-4" />
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center text-green-600">
              Password reset successfully. Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}