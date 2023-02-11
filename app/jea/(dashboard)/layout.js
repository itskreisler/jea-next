import TagNavbar from 'Components/TagNavbar'
export default function LayoutDashBoard ({ children }) {
  return (
    <>
      <TagNavbar />
      {children}
    </>
  )
}
