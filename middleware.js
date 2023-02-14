
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
export async function middleware (request) {
  const jwt = request.cookies.get('jeaNext')
  if (!jwt) return NextResponse.redirect(new URL('/', request.url))
  try {
    await jwtVerify(
      jwt.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
export const config = {
  matcher: ['/jea/:path*']
}
