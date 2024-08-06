'use client'

import { useState } from 'react'

import Sheet from './sheet'
import Menu from './menu'

export default function Main() {
  const [putStone, setPutStone] = useState(false)

  return (
    <div className="z-0 grid w-full p-7 md:grid-cols-2">
      <Sheet width={400.0} putStone={putStone} setPutStone={setPutStone} />
      <Menu putStone={putStone} setPutStone={setPutStone} />
    </div>
  )
}
