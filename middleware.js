
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
export async function middleware (request) {
  const account = request.cookies.get('jeaNextAccount')
  if (!account) return NextResponse.redirect(new URL('/', request.url))
  try {
    const token = request.cookies.get(account.value)
    await jwtVerify(
      token.value,
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
