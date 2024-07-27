"use client";

import { useState } from "react"

import Sheet from "./sheet"
import Menu from "./menu"

export default function Main() {

  const [putStone, setPutStone] = useState(false);

  return (
    <div className="px-10 py-10 grid md:grid-cols-2">
      <Sheet putStone={putStone} setPutStone={setPutStone} />
      <Menu putStone={putStone} setPutStone={setPutStone} />
    </div >
  )
}
