import { JSDOM } from 'jsdom'
import superagent from 'superagent'

import { jwtVerify, cryptoJsDecrypt, jeaBody } from '../../helpers/exports'
export default async function handler (_req, _res) {
  try {
    const account = _req.cookies.jeaNextAccount
    const token = _req.cookies[account]
    const { data } = jwtVerify(token)
    const [txtLogin, txtPassword] = [cryptoJsDecrypt(data.txtLogin), cryptoJsDecrypt(data.txtPassword)]

    return _res.status(200).json(await getProfile({ ...jeaBody, txtLogin, txtPassword }))
  } catch (e) {
    return _res.json({ code: false, message: 'Invalid token' })
  }
}
const getProfile = async (body) => {
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
        data: getInfo(postData)
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

const getInfo = (html) => {
  const dom = new JSDOM(html)
  const $ = (selector) => dom.window.document.querySelectorAll(selector)
  const LabelsInputsSelects = [...$('.form-group')]
    .filter(
      (item) => typeof item.querySelector('label')?.textContent !== 'undefined'
    )
    .map((item) => {
      const label = item.querySelector('label')?.textContent
      const input = item.querySelector('input')?.value || null
      const selected = item.querySelector('select')?.value || null
      const select = [...item.querySelectorAll('option')].map((item) => ({
        value: item.getAttribute('value'),
        text: item?.textContent
      }))

      return { label, input, selected, select }
    })
  return LabelsInputsSelects
}
