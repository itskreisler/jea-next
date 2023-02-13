import TagNavbar from '../../../components/TagNavbar'
export default function LayoutDashBoard ({ children }) {
  return (
    <>
      <TagNavbar />
      {children}
    </>
  )
}
