import { Shot } from '@/types/model'
import { SheetContainer } from './sheetContainer'
import React from 'react'

type Props = {
  selectedShotData: Shot
}

export default function StonePositionsSection({ selectedShotData }: Props) {

  return (
    <section className='w-full h-full'>
      <h2 className="text-lg font-medium mb-4">Stone Positions</h2>
      <div className="h-full">
        <SheetContainer
          friendStones={selectedShotData?.stones?.friend_stones}
          enemyStones={selectedShotData?.stones?.enemy_stones}
        />
      </div>

    </section>
  )
}
