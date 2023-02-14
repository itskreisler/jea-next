import { jwtVerify, cookieSerialize } from '../../../helpers/exports'
export default function handler (_req, _res) {
  const { jeaNext } = _req.cookies
  if (!jeaNext) return _res.status(401).json({ code: false, message: 'Invalid token' })

  try {
    jwtVerify(jeaNext)
    const serialized = cookieSerialize('jeaNext', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })
    _res.setHeader('Set-Cookie', serialized)
    return _res.status(200).json({ code: true, message: 'Logout success' })
  } catch (e) {
    return _res.status(401).json({ code: false, message: 'Invalid token' })
  }
}
