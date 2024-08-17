// Mock Supabase client
export const supabase = {
  from: (table: string) => ({
    insert: (data: any) => ({
      select: () => Promise.resolve({ data: { ...data, id: 'mock-id' }, error: null })
    })
  })
};

// Commented out real Supabase implementation
/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
*/