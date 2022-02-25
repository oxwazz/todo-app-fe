import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: any) {
  console.log(33332, 'sdadsfsdf', req.url.includes('/login'))

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  console.log(33332, session, process.env.NEXTAUTH_SECRET)
  if (!session) return NextResponse.redirect('/api/auth/signin')

  // If user is authenticated, continue.
  return NextResponse.next()
}

// import { withAuth } from 'next-auth/middleware'

// // More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized: (token) => {
//       console.log(token)
//       return true
//     },
//   },
// })
