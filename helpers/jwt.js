import jwt, { verify } from 'jsonwebtoken'

export const jwtSign = (data) => jwt.sign({
  exp: Math.round(Date.now() / 1000) * 60 * 60 * 24 * 30,
  data
}, process.env.JWT_TOKEN)

export const jwtVerify = (token) => verify(token, process.env.JWT_TOKEN)
