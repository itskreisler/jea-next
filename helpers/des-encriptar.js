import CryptoJS from 'crypto-js'
export const cryptoJsEncrypt = (text, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey = 'secret-key')
  return ciphertext.toString()
}
export const cryptoJsDecrypt = (ciphertext, secretKey = 'secret-key') => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
