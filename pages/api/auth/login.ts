import { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
const jea = {
  login:
    'https://jovenes.prosperidadsocial.gov.co/JeA/App/Autenticacion/Ingreso.aspx'
}
async function getBrowserInstance () {
  const executablePath = await chromium.executablePath

  if (!executablePath) {
    // running locally
    const puppeteer = require('puppeteer')
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true
    })
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true
  })
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
  let browser = null
  try {
    browser = await getBrowserInstance()
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0)
    page.setRequestInterception(true)
    page.on('request', interceptedRequest => {
      interceptedRequest.continue({
        method: 'POST',
        postData: new URLSearchParams(body).toString(),
        headers: {
          ...interceptedRequest.headers(),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    })
    await page.goto(jea.login)
    const validCredencials = await page.evaluate(() => {
      try {
        const message = document.querySelector('#panelMensajes').textContent.trim()
        return { code: !message, message }
      } catch (error) {
        return { code: true, message: 'Login success' }
      }
    })
    if (validCredencials.code) {
      const cookies = await page.cookies()
      const token = jwt.sign({
        exp: Math.round(Date.now() / 1000) * 60 * 60 * 24 * 30,
        cookies
      }, process.env.JWT_TOKEN)
      const serialized = serialize('jeaNext', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/'
      })
      _res.setHeader('Set-Cookie', serialized)
    }
    browser.close()
    return _res.status(200).json(validCredencials)
  } catch (error) {
    console.log(error)
    _res.json({
      status: 'error',
      data: error.message || 'Something went wrong'
    })
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}
