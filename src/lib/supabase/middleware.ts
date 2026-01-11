import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // 1. If user is logged in and tries to access login/auth, redirect to garage
  if (user && (path.startsWith('/login') || path.startsWith('/auth'))) {
    return NextResponse.redirect(new URL('/garage', request.url))
  }

  // 2. Public routes that don't require auth
  const isPublicRoute = 
    path === '/' ||
    path.startsWith('/marketplace') ||
    path.startsWith('/listing') ||
    path.startsWith('/post') ||
    path.startsWith('/login') ||
    path.startsWith('/auth') ||
    path.startsWith('/auth/update-password') ||
    path.startsWith('/api') ||
    path.includes('.')

  // 3. Protected routes logic
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('returnTo', path)
    return NextResponse.redirect(url)
  }

  return response
}
