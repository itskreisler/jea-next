import { serialize } from 'cookie'
export const cookieSerialize = (name, value, options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24 * 30,
  path: '/'
}) => serialize(name, value, options)
