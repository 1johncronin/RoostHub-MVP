'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/garage')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string

  // 1. Sign up auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // 2. Create profile (Trigger handled by DB usually, but for MVP we can manual insert if trigger not set)
  // We'll rely on the user to confirm email first usually, but let's see.
  // Ideally, we have a DB Trigger. If not, we insert into profiles here.
  // For safety, let's try to insert into profiles if user exists.
  
  if (data.user) {
     const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username: username,
        role: 'user'
     })
     
     if (profileError) {
        console.error('Profile creation failed:', profileError)
        // Note: Auth user is created, but profile failed. 
     }
  }

  revalidatePath('/', 'layout')
  redirect('/garage')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
