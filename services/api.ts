import { supabase } from './supabase'

export const createQRCode = async (url: string) => {
  const { data, error } = await supabase
    .from('qr_codes')
    .insert({ url, created_at: new Date().toISOString() })
    .single()

  if (error) throw new Error(error.message)
  return data
}