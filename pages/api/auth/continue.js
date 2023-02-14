// TODO: Agregue una forma de continuar el proceso de autenticación
export default function handler (_req, _res) {
  const { account } = _req.body
  return _res.status(200).json({ hello: 'world....' })
}
