'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Comment out authentication logic for demo
    // try {
    //   await signInWithEmailAndPassword(auth, email, password)
    //   router.push('/dashboard')
    // } catch (err) {
    //   setError('Failed to log in. Please check your credentials.')
    // }

    // For demo purposes, just redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-4"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button type="submit" className="w-full mb-4">Login</Button>
        <p>
          Don&apos;t have an account? <Link href="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  )
}