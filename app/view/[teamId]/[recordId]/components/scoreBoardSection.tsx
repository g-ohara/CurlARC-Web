import { extractTeamsScoreData } from '../../../../../utils/func/score'
import ScoreBoard from './scoreBoard'
import { RecordDetail } from '../../../../../types/model'
import React from 'react'

type Props = {
  recordDetails: RecordDetail
  teamName: string
  onEndSelect: (endIndex: number) => void
}

export default function ScoreBoardSection({ recordDetails, teamName, onEndSelect }: Props) {
  const teamScoreData = extractTeamsScoreData(recordDetails)
  teamScoreData.friend.teamName = teamName
  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Score</h2>
      <ScoreBoard friendScore={teamScoreData.friend} enemyScore={teamScoreData.enemy} onEndSelect={onEndSelect}/>
    </section>
  )
}