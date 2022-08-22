import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true })
  if (!session) return NextResponse.redirect('/api/auth/signin')

  // If user is authenticated, continue.
  return NextResponse.next()
}
