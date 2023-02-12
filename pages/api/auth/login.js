import { getBrowserInstance } from '../../../hooks/chromium'
import { jwtsign } from '../../../hooks/jwt'
import { serialize } from 'cookie'
const jea = {
  login:
    'https://jovenes.prosperidadsocial.gov.co/JeA/App/Autenticacion/Ingreso.aspx'
}

export default async function handler (_req, _res) {
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
  let browser = null
  try {
    browser = await getBrowserInstance()

    return _res.status(200).json('validCredencials')
  } catch (error) {
    console.log(error)
    _res.json({
      status: 'error',
      data: error.message || 'Algo salió mal'
    })
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}
