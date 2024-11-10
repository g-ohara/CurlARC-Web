'use client'

import { Hammer } from 'lucide-react'
import React, { FC, useMemo } from 'react'

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
      ${isSelected ? 'bg-blue-200' : ''}`}
    onClick={onClick}
    aria-label={ariaLabel}
    role="button"
  >
    {score}
  </td>
)

const TeamNameCell: FC<{ teamName: string; color: string }> = ({ teamName, color }) => (
  <td className={`border-b border-muted bg-${color}-500 px-2 py-1 text-xs sm:text-sm md:text-base font-bold text-black`}>
    <div className="max-w-[100px] md:max-w-[150px] overflow-x-auto whitespace-nowrap scrollbar-hide">
      {teamName}
    </div>
  </td>
)

const FirstStoneCell: FC<{ isFirst: boolean, isFriend: boolean, isEditMode: boolean, onIsFirstChange: (isFirst: boolean) => void }> = ({ isFirst, isFriend, isEditMode, onIsFirstChange }) => (
  <td
    className={`border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base ${isEditMode ? 'cursor-pointer' : ''}`}
    onClick={() => isEditMode && onIsFirstChange(isFriend)}
  >
    {isFirst ? <Hammer /> : ''}
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
  console.log(color)
  return (
    <tr>
      <TeamNameCell teamName={teamName} color={color} />
      <FirstStoneCell isFirst={isFirst} onIsFirstChange={onIsFirstChange} isFriend={isFriend} isEditMode={isEditMode} />
      {scores.map((score, index) => (
        <ScoreCell
          key={`${teamName}-${index}`}
          score={score}
          isSelected={selectedRoundIndex === index}
          onClick={() => onEndSelect(index)}
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
  isFirst: boolean
  isEditMode: boolean
  handleIsFirstChange: (isFirst: boolean) => void
  onEndSelect: (endIndex: number) => void
}

const ScoreBoard: FC<ScoreBoardProps> = ({
  friendScore,
  enemyScore,
  selectedEndIndex,
  isFirst,
  isEditMode,
  handleIsFirstChange,
  onEndSelect,
}) => {
  const roundCount = Math.max(friendScore.scores.length, enemyScore.scores.length)
  const headers = useMemo(() => Array.from({ length: roundCount }, (_, i) => i + 1), [roundCount])

  const colors = {
    headerBg: 'bg-gray-100',
    selectedBorder: 'bg-blue-200',
    hoverBg: 'hover:bg-gray-200'
  }

  return (
    <div className="overflow-x-auto ">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={colors.headerBg}>
            <th className="border-b border-muted px-2 py-1 text-left text-xs sm:text-sm md:text-base">
              <div className="max-w-[100px] md:max-w-[150px] overflow-hidden">TEAM</div>
            </th>
            <th className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">
            </th>
            {headers.map((header, index) => (
              <th
                key={`header-${header}`}
                className={`border-b border-muted px-1 py-1 text-center text-xs sm:text-sm md:text-base cursor-pointer 
                  ${selectedEndIndex === index ? `${colors.selectedBorder} border-2` : `${colors.hoverBg}`}`}
                onClick={() => onEndSelect(index)}
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
          <ScoreRow
            key={`team-${friendScore.teamName}`}
            {...friendScore}
            selectedRoundIndex={selectedEndIndex}
            isFirst={isFirst}
            isFriend={true}
            color='red'
            isEditMode={isEditMode}
            onEndSelect={onEndSelect}
            onIsFirstChange={handleIsFirstChange}
          />
          <ScoreRow
            key={`team-${enemyScore.teamName}`}
            {...enemyScore}
            selectedRoundIndex={selectedEndIndex}
            isFriend={false}
            isFirst={!isFirst}
            color='yellow'
            isEditMode={isEditMode}
            onEndSelect={onEndSelect}
            onIsFirstChange={handleIsFirstChange}
          />
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
