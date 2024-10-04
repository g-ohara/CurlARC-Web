'use client'

import React, { Suspense, useState } from 'react'
import RecordHeader from './components/recordHeader'
import ScoreBoardSection from './components/scoreBoardSection'
import MatchDetailsSection from './components/matchDetailsSection'
import StonePositionsSection from './components/stonePositionsSection'
import LoadingSpinner from './components/loadingSpinner'
import { getRecordDetailsByRecordIdResponse, getTeamDetailsResponse } from '@/types/response'

type Props = {
  recordRes: getRecordDetailsByRecordIdResponse
  teamRes: getTeamDetailsResponse
  recordId: string
}

export default function RecordClient({ recordRes, teamRes, recordId }: Props) {
  const [end, setEnd] = useState(1)
  const [shot, setShot] = useState(1)

  const onEndSelect = (end: number) => {
    console.log('end', end)
    setEnd(end)
  }

  const onShotSelect = (shot: number) => {
    console.log('shot', shot)
    setShot(shot)
  }

  // ends_dataが存在しない場合のデフォルトの安全な処理
  const endsData = recordRes.record.ends_data ?? []
  const selectedEndData = endsData[end] ?? null
  const shotsData = selectedEndData?.shots ?? []
  const selectedShotData = shotsData[shot] ?? null

  return (
    <div className="w-full h-full overflow-hidden mx-4 my-4">
      <RecordHeader
        friendTeamName={teamRes.team.name}
        enemyTeamName={recordRes.record.enemy_team_name}
        recordId={recordId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8 h-full">
        <div className="lg:col-span-3 space-y-8">
          <Suspense fallback={<LoadingSpinner />}>
            <ScoreBoardSection recordDetails={recordRes.record} teamName={teamRes.team.name} onEndSelect={onEndSelect} />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <MatchDetailsSection recordDetails={recordRes.record} />
          </Suspense>
        </div>
        
        <div className="lg:col-span-2 h-full">
          <Suspense fallback={<LoadingSpinner />}>
            <StonePositionsSection selectedShotData={selectedShotData} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}