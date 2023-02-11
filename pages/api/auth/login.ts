import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { rollbar } from '../../../hooks/rollbar'
const jea = {
  login:
    'https://jovenes.prosperidadsocial.gov.co/JeA/App/Autenticacion/Ingreso.aspx'
}
export default async function handler (_req: NextApiRequest, _res: NextApiResponse) {
  const { txtLogin, txtPassword } = _req.body
  if (!txtLogin && !txtPassword) {
    return _res.status(401).json({ error: 'txtLogin & txtPassword is null' })
  }
  const body = {
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __VIEWSTATE:
      '/wEPDwUKMTgzMTkwNjU5N2RkBzRfMAiOYq+2C5xb/CKcUKIc0tteUaD5VsGtBdniwOw=',
    __VIEWSTATEGENERATOR: '5FB187ED',
    __EVENTVALIDATION:
      '/wEdAAVkLbFzMJkj2q5ajQFnB1/Nxcn6oIDdbNQI5AQUIIyv4nY2+Mc6SrnAqio3oCKbxYbhmcUwnnAqzH7wP2sLpdBP5S6DA253Jb+lVAXUo1bJz6namLqidyxo2qXDrxuDEDt4cCYQJnlXam9t00UTah+n',
    BtnEntrar: 'Entrar',
    txtLogin,
    txtPassword
  }
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
