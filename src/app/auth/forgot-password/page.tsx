'use client'

import { useState } from 'react'
import { resetPassword } from './actions'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await resetPassword(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/20 font-sans">
      <div className="w-full max-w-sm space-y-8 bg-background p-8 rounded-2xl border border-border shadow-sm">
        <div className="text-center">
          <h1 className="font-roboto-condensed font-bold italic text-3xl">Reset Password</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            We'll send a recovery link to your email.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 text-primary rounded-lg text-sm font-medium">
              Check your email for the reset link!
            </div>
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
                placeholder="braap@example.com"
              />
            </div>

            {error && <div className="text-sm text-destructive text-center font-medium">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md font-bold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
            </button>

            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary pt-2">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
