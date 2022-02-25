import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: any) {
  console.log(33331, req.nextUrl.pathname === '/')
  if (req.nextUrl.pathname === '/') return NextResponse.redirect('/app')
  return NextResponse.next()
}
