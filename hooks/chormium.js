import chromium from 'chrome-aws-lambda'
export async function getBrowserInstance () {
  const executablePath = await chromium.executablePath

  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true
  })
}
