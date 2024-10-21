import { extractTeamsScoreData } from '../../../../utils/func/score'
import ScoreBoard from './scoreBoard'
import { RecordDetail } from '../../../../types/model'
import React from 'react'

type Props = {
  record: RecordDetail
  friendTeamName: string
  onEndSelect: (endIndex: number) => void
  selectedEndIndex: number
  isEditMode: boolean
  handleIsFirstChange: (isFirst: boolean) => void
}

export default function ScoreBoardSection({ record, friendTeamName, onEndSelect, selectedEndIndex, isEditMode, handleIsFirstChange }: Props) {
  const teamScoreData = extractTeamsScoreData(record)
  teamScoreData.friend.teamName = friendTeamName
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Score Board</h2>
      <ScoreBoard 
        friendScore={teamScoreData.friend} 
        enemyScore={teamScoreData.enemy}
        isFirst={record.is_first}
        onEndSelect={onEndSelect}
        selectedEndIndex={selectedEndIndex}
        handleIsFirstChange={handleIsFirstChange}
        isEditMode={isEditMode}
      />
    </section>
  )
}