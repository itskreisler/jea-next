import TagNav from '../components/TagNav'
export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <link
          rel='stylesheet'
          href='https://unpkg.com/@picocss/pico@1.*/css/pico.min.css'
        />
      </head>
      <body>
        <main className='container'>
          <TagNav />
          {children}
        </main>
      </body>
    </html>
  )
}
