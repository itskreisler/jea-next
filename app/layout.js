import './globals.scss'
/* eslint-disable @next/next/no-sync-scripts */
export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <script src='/js/fontawesome.js' />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
