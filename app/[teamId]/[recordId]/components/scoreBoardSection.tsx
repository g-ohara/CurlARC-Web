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
  handleIsRedChange: (isRed: boolean) => void
  handleIsFirstChange: (isFirst: boolean) => void
}

export default function ScoreBoardSection({
  record,
  friendTeamName,
  onEndSelect,
  selectedEndIndex,
  isEditMode,
  handleIsRedChange,
  handleIsFirstChange
}: Props) {
  const teamScoreData = extractTeamsScoreData(record)
  teamScoreData.friend.teamName = friendTeamName
  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Score Board</h2>
      <ScoreBoard
        friendScore={teamScoreData.friend}
        enemyScore={teamScoreData.enemy}
        isRed={record.is_red}
        isFirst={record.is_first}
        onEndSelect={onEndSelect}
        selectedEndIndex={selectedEndIndex}
        handleIsRedChange={handleIsRedChange}
        handleIsFirstChange={handleIsFirstChange}
        isEditMode={isEditMode}
      />
    </section>
  )
}

