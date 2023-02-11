import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import { rollbar } from '../../../hooks/rollbar'

export default async function handler (_req: NextApiRequest, _res: NextApiResponse) {
  try {
    const browser = await puppeteer.launch(/* {
      headless: true,
      devtools: true,
      args: [
        '--disable-cache',
        '--disable-application-cache',
        '--enable-features=NetworkService',
        '--no-sandbox'
      ],
      ignoreHTTPSErrors: true
    } */)
    browser.close()

    return _res.status(200).json('el navegador se abrio y cerro correctamente')
  } catch (e) {
    rollbar.log('hubo un error')
    return _res
      .status(500)
      .json({
        code: true,
        error: e,
        message: 'Error interno en el servidor, por favor vuelve a intentarlo más tarde.'
      })
  }
}
