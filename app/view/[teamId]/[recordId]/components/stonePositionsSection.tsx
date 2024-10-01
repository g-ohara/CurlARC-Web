import { Shot } from '@/types/model'
import { SheetContainer } from './sheetContainer'
import React from 'react'

type Props = {
  selectedShotData: Shot | null // selectedShotDataがnullの場合に対応
}

export default function StonePositionsSection({ selectedShotData }: Props) {
  // selectedShotDataのnullチェック
  if (!selectedShotData) {
    return <div>No shot data available</div>
  }

  const { stones } = selectedShotData

  // stonesのnullチェック
  if (!stones || !stones.friend_stones || !stones.enemy_stones) {
    return <div>Stone data is incomplete</div>
  }

  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Stone Positions</h2>
      <SheetContainer
        friendStones={stones.friend_stones}
        enemyStones={stones.enemy_stones}
      />
    </section>
  )
}
