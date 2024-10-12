import { extractTeamsScoreData } from '../../../../../utils/func/score'
import ScoreBoard from './scoreBoard'
import { RecordDetail } from '../../../../../types/model'
import React from 'react'

type Props = {
  record: RecordDetail
  friendTeamName: string
  onEndSelect: (endIndex: number) => void
  selectedEndIndex: number
  isEditMode: boolean
}

export default function ScoreBoardSection({ record, friendTeamName, onEndSelect }: Props) {
  const teamScoreData = extractTeamsScoreData(record)
  teamScoreData.friend.teamName = friendTeamName
  return (
    <section>
      <h2 className="text-lg font-medium mb-4">Score</h2>
      <ScoreBoard friendScore={teamScoreData.friend} enemyScore={teamScoreData.enemy} onEndSelect={onEndSelect}/>
    </section>
  )
}