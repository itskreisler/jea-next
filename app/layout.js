import './globals.scss'
/* eslint-disable @next/next/no-sync-scripts */
export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <script src='https://kit.fontawesome.com/c33374846e.js' crossOrigin='anonymous' />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
