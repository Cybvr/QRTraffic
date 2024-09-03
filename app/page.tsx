// app/page.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import RootLayout from '@/app/layout';  // Adjust the import path to where your layout component is located

function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null;
}

export default function WrappedHome() {
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  );
}