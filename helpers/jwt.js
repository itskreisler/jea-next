import jwt from 'jsonwebtoken'

export const jwtsign = (clave) => jwt.sign({
  exp: Math.round(Date.now() / 1000) * 60 * 60 * 24 * 30,
  clave
}, process.env.JWT_TOKEN)
