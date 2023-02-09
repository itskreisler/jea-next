import { NextApiRequest, NextApiResponse } from 'next'

export default function handler (_req: NextApiRequest, _res: NextApiResponse) {
  return _res.status(200).json({ hello: 'world....' })
}