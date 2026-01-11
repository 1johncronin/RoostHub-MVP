'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/layout/Logo'

export default function UpdatePasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/garage?message=Password updated successfully')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/20 font-sans">
      <div className="w-full max-w-sm space-y-8 bg-background p-8 rounded-2xl border border-border shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Logo className="mb-4" />
          <h1 className="font-roboto-condensed font-bold italic text-2xl">Set New Password</h1>
          <p className="text-muted-foreground text-sm">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
            />
          </div>

          {error && <div className="text-sm text-destructive text-center font-medium">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
