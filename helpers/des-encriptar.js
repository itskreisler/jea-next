import CryptoJS from 'crypto-js'
export const encrypt = (text, secretKey) => {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey)
  return ciphertext.toString()
}
export const decrypt = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
