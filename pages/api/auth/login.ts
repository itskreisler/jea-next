import { NextApiRequest, NextApiResponse } from 'next'
import { JSDOM } from 'jsdom'
import superagent from 'superagent'
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
  return _res.json(await getCookies(body))
}
const getCookies = async (body) => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const response = await superagent.agent()
      .post(
        'https://jovenes.prosperidadsocial.gov.co/JeA/App/Autenticacion/Ingreso.aspx'
      )
      .send(body)
      .set('Content-Type', 'application/x-www-form-urlencoded')
    const postData = response.text
    const dom = new JSDOM(postData)
    const $ = (_) => dom.window.document.querySelector(_)
    const panelMensajes = $('#panelMensajes')?.textContent.trim()
    if (typeof panelMensajes === 'undefined') {
      return { code: true, message: 'Login success' }
    }
    return { code: false, message: panelMensajes }

    // const cookies = await response.header['set-cookie']
    // console.log(cookies)
    // const other = await superagent.get('https://jovenes.prosperidadsocial.gov.co/JeA/App/Default.aspx')
    // console.log(other.header['set-cookie'])
  } catch (err) {
    console.error(err)
    return { code: false, message: 'Error interno en el servidor' }
  }
}
