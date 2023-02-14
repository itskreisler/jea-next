import { jwtVerify, cookieSerialize } from '../../../helpers/exports'
export default function handler (_req, _res) {
  const { jeaNextAccount } = _req.cookies
  if (!jeaNextAccount) return _res.status(401).json({ code: false, message: 'Invalid token' })

  try {
    jwtVerify(_req.cookies[jeaNextAccount])
    const account = cookieSerialize('jeaNextAccount', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })
    const token = cookieSerialize(jeaNextAccount, null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })

    _res.setHeader('Set-Cookie', [account, token])
    return _res.status(200).json({ code: true, message: 'Logout success' })
  } catch (e) {
    console.log(e)
    return _res.status(401).json({ code: false, message: 'Token error' })
  }
}
