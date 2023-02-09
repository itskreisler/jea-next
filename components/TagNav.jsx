import Link from 'next/link'
const TagNav = () => {
  return (
    <nav>
      <ul>
        <li><strong>JEA-NEXT</strong></li>
      </ul>
      <ul>
        <li><Link href='/otro'>otro</Link></li>
        <li><Link href='/'>Home</Link></li>
      </ul>
    </nav>
  )
}

export default TagNav
