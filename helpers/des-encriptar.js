import CryptoJS from 'crypto-js'
const CRYPTO_KEY = process.env.CRYPTO_KEY || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
export const cryptoJsEncrypt = (text, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey = CRYPTO_KEY)
  return ciphertext.toString()
}
export const cryptoJsDecrypt = (ciphertext, secretKey = CRYPTO_KEY) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
