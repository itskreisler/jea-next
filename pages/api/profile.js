export default async function handler (_req, _res) {
  const response = await fetch('http://129.213.52.246/')
  const data = await response.json()
  return _res.status(200).json(data)
}
