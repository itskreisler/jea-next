import { JSDOM } from 'jsdom'
import superagent from 'superagent'
import {
  jeaBody,
  jwtSign,
  cryptoJsEncrypt,
  cookieSerialize
} from '../../../helpers/exports'
export default async function handler (_req, _res) {
  const { txtLogin, txtPassword } = _req.body
  if (!txtLogin && !txtPassword) {
    return _res.status(401).json({ error: 'txtLogin & txtPassword is null' })
  }
  const token = jwtSign({
    txtLogin: cryptoJsEncrypt(txtLogin),
    txtPassword: cryptoJsEncrypt(txtPassword)
  })
  const serialized = cookieSerialize(
    `jeaNext.${txtLogin.split('@').shift()}`,
    token
  )
  _res.setHeader('Set-Cookie', serialized)
  _res.setHeader(
    'Set-Cookie',
    cookieSerialize(
      'jeaNextAccount',
      jwtSign({ account: `jeaNext.${txtLogin.split('@').shift()}` })
    )
  )
  return _res.json(await checkLogin({ ...jeaBody, txtLogin, txtPassword }))
}
const checkLogin = async (body) => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    const response = await superagent
      .agent()
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
      return {
        code: true,
        message: 'Login success',
        cookie: response.header['set-cookie']
      }
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
