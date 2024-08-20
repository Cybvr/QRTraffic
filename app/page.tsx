'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/auth/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  return null
}