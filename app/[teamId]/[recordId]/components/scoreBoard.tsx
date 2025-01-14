'use client'

import { Hammer } from 'lucide-react'
import React, { FC } from 'react'
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from 'lucide-react'

interface ScoreCellProps {
  score: number | string
  isHeader?: boolean
  isSelected?: boolean
  onClick?: () => void
  ariaLabel: string
}

const ScoreCell: FC<ScoreCellProps> = ({ score, isHeader = false, isSelected = false, onClick, ariaLabel }) => (
  <td
    className={`border-b border-muted px-1 py-1 text-center text-xs sm:text-sm md:text-base
      ${isHeader ? 'cursor-pointer' : ''}
      ${isSelected ? 'bg-blue-200' : score === '' ? 'bg-gray-400' : 'bg-white'}`}
    onClick={onClick}
    aria-label={ariaLabel}
    role="button"
  >
    {score}
  </td>
)

const TeamNameCell: FC<{ teamName: string; color: string }> = ({ teamName, color }) => {
  return (
    <td className={`border-b border-muted ${color} px-2 py-1 text-xs sm:text-sm md:text-base font-bold text-black`}>
      <div className="max-w-[100px] md:max-w-[150px] overflow-x-auto whitespace-nowrap scrollbar-hide">
        {teamName}
      </div>
    </td>
  )
}

const FirstStoneCell: FC<{ isFirst: boolean, isFriend: boolean, isEditMode: boolean, onIsFirstChange: (isFirst: boolean) => void }> = ({ isFirst, isFriend, isEditMode, onIsFirstChange }) => (
  <td
    className={`border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base ${isEditMode ? 'cursor-pointer' : ''}`}
    onClick={() => isEditMode && onIsFirstChange(isFriend)}
  >
    {isFirst || <Hammer />}
  </td>
)

interface ScoreRowProps extends ScoreData {
  selectedRoundIndex: number
  isFriend: boolean
  isFirst: boolean
  isEditMode: boolean
  onEndSelect: (round: number) => void
  onIsFirstChange: (isFirst: boolean) => void
}

const ScoreRow: FC<ScoreRowProps> = ({ teamName, color, scores, total, selectedRoundIndex, isFirst, onEndSelect, onIsFirstChange, isFriend, isEditMode }) => {
  const filledScores = scores.map(score => score.toString());
  while (filledScores.length < 11) {
    filledScores.push('');
  }
  return (
    <tr>
      <TeamNameCell teamName={teamName} color={color} />
      <FirstStoneCell isFirst={isFirst} onIsFirstChange={onIsFirstChange} isFriend={isFriend} isEditMode={isEditMode} />
      {filledScores.map((score, index) => (
        <ScoreCell
          key={`${teamName}-${index}`}
          score={score}
          isSelected={selectedRoundIndex === index}
          onClick={score !== "" ? () => onEndSelect(index) : undefined}
          ariaLabel={`${teamName} score for round ${index + 1}: ${score}`}
        />
      ))}
      <td className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base font-bold">{total}</td>
    </tr>
  )
}

interface ScoreBoardProps {
  friendScore: ScoreData
  enemyScore: ScoreData
  selectedEndIndex: number
  isRed: boolean
  isFirst: boolean
  isEditMode: boolean
  handleIsRedChange: (isRed: boolean) => void
  handleIsFirstChange: (isFirst: boolean) => void
  onEndSelect: (endIndex: number) => void
}

const ScoreBoard: FC<ScoreBoardProps> = ({
  friendScore,
  enemyScore,
  selectedEndIndex,
  isRed,
  isFirst,
  isEditMode,
  handleIsRedChange,
  handleIsFirstChange,
  onEndSelect,
}) => {
  const headers = Array.from({ length: 11 }, (_, i) => i + 1);

  const colors = {
    headerBg: 'bg-gray-100',
    disabledHeaderBg: 'bg-gray-500',
    selectedBorder: 'bg-blue-200',
    hoverBg: 'hover:bg-gray-200',
    redBg: 'bg-red-500',
    yellowBg: 'bg-yellow-300',
  }

  const FriendRow = () => (
    <ScoreRow
      key={`team-${friendScore.teamName}`}
      {...friendScore}
      selectedRoundIndex={selectedEndIndex}
      isFirst={isFirst}
      isFriend={true}
      color={isRed ? colors.redBg : colors.yellowBg}
      isEditMode={isEditMode}
      onEndSelect={onEndSelect}
      onIsFirstChange={handleIsFirstChange}
    />
  )

  const EnemyRow = () => (
    <ScoreRow
      key={`team-${enemyScore.teamName}`}
      {...enemyScore}
      selectedRoundIndex={selectedEndIndex}
      isFriend={false}
      isFirst={!isFirst}
      color={isRed ? colors.yellowBg : colors.redBg}
      isEditMode={isEditMode}
      onEndSelect={onEndSelect}
      onIsFirstChange={handleIsFirstChange}
    />
  )

  return (
    <div className="overflow-x-auto ">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={colors.headerBg}>
            <th className="border-b border-muted px-2 py-1 text-left text-xs sm:text-sm md:text-base">
              <div className="max-w-[100px] md:max-w-[150px] overflow-hidden">
                TEAM
                {
                  isEditMode && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleIsRedChange(!isRed)}
                      className="ml-2 h-6 bg-gray-300 hover:bg-gray-400"
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  )
                }
              </div>
            </th>
            <th className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">
            </th>
            {headers.map((header, index) => (
              <th
                key={`header-${header}`}
                className={`border-b border-muted px-1 py-1 text-center text-xs sm:text-sm md:text-base bg-grey-500
                  ${header <= friendScore.scores.length ? (selectedEndIndex === index ? `${colors.selectedBorder} border-2` : `${colors.hoverBg}`) : colors.disabledHeaderBg}`}
                onClick={header <= friendScore.scores.length ? () => onEndSelect(index) : undefined}
                aria-label={`Select round ${header}`}
                role="button"
              >
                {header === 11 ? 'Ex' : header}
              </th>
            ))}
            <th className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {
            isRed
              ? <><FriendRow /><EnemyRow /></>
              : <><EnemyRow /><FriendRow /></>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
