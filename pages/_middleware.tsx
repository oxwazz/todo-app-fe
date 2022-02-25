import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: any) {
  if (req.nextUrl.pathname === '/') return NextResponse.redirect('/app')
  return NextResponse.next()
}
