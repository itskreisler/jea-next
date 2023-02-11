import chromium from 'chrome-aws-lambda'
export async function getBrowserInstance () {
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
