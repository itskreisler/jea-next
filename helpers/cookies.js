import { serialize } from 'cookie'
export const cookieSerialize = (name, value) => serialize(name, value, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 30,
  path: '/'
})
