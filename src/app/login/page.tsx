'use client'

import Link from 'next/link'
import { login, signup } from '../auth/actions'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const action = isLogin ? login : signup
    const result = await action(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/20 font-sans">
      <div className="w-full max-w-sm space-y-8 bg-background p-8 rounded-2xl border border-border shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Logo className="mb-4" />
          <p className="text-muted-foreground text-sm font-medium">
            {isLogin ? 'Welcome back, rider.' : 'Join the community.'}
          </p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {!isLogin && (
             <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required={!isLogin}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-none"
                placeholder="@roostking"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-none"
              placeholder="braap@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
                </label>
                {isLogin && (
                    <Link href="/auth/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
                        Forgot Password?
                    </Link>
                )}
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary outline-none"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="text-center text-sm">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}
