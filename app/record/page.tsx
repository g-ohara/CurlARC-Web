import Sheet from "./sheet"
import Menu from "./menu"

export default function Main() {
  return (
    <div className="px-10 py-10 grid md:grid-cols-2">
      <Sheet />
      <Menu />
    </div >
  )
}
