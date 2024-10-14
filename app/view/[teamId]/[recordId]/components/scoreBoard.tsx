'use client'

import React, { FC, useState, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

interface CustomColors {
  headerBg?: string
  selectedBorder?: string
  hoverBg?: string
}

interface ScoreBoardProps {
  friendScore: ScoreData
  enemyScore: ScoreData
  onEndSelect: (endIndex: number) => void
  selectedEndIndex: number
  customColors?: CustomColors
}

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
      ${isSelected ? 'bg-yellow-300' : ''}`}
    onClick={onClick}
    aria-label={ariaLabel}
    role="button"
  >
    {score}
  </td>
)

const TeamNameCell: FC<{ teamName: string; color: string }> = ({ teamName, color }) => (
  <td className={`border-b border-muted bg-${color}-500 px-2 py-1 text-xs sm:text-sm md:text-base font-bold text-${color}-50`}>
    <div className="max-w-[100px] md:max-w-[150px] overflow-x-auto whitespace-nowrap scrollbar-hide">
      {teamName}
    </div>
  </td>
)

const FirstStoneCell: FC<{ isFirstStone: boolean }> = ({ isFirstStone }) => (
  <td className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">
    {isFirstStone ? '●' : ''}
  </td>
)

interface ScoreRowProps extends ScoreData {
  selectedRoundIndex: number
  onEndSelect: (round: number) => void
}

const ScoreRow: FC<ScoreRowProps> = ({ teamName, color, scores, total, selectedRoundIndex, onEndSelect }) => {
  const isFirstStone = true

  return (
    <tr>
      <TeamNameCell teamName={teamName} color={color} />
      <FirstStoneCell isFirstStone={isFirstStone} />
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

const ScoreBoard: FC<ScoreBoardProps> = ({
  friendScore,
  enemyScore,
  onEndSelect,
  selectedEndIndex,
  customColors = {}
}) => {
  const roundCount = Math.max(friendScore.scores.length, enemyScore.scores.length)
  const headers = useMemo(() => Array.from({ length: roundCount }, (_, i) => i + 1), [roundCount])
  const isMobile = useMediaQuery({ maxWidth: 640 })

  const colors = useMemo(() => ({
    headerBg: customColors.headerBg || 'bg-gray-100',
    selectedBorder: customColors.selectedBorder || 'bg-yellow-300',
    hoverBg: customColors.hoverBg || 'hover:bg-gray-200'
  }), [customColors])

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={colors.headerBg}>
            <th className="border-b border-muted px-2 py-1 text-left text-xs sm:text-sm md:text-base">
              <div className="max-w-[100px] md:max-w-[150px] overflow-hidden">TEAM</div>
            </th>
            <th className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">
              1st
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
                {/* {isMobile ? header : `${header}`} */}
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
            onEndSelect={onEndSelect}
          />
          <ScoreRow
            key={`team-${enemyScore.teamName}`}
            {...enemyScore}
            selectedRoundIndex={selectedEndIndex}
            onEndSelect={onEndSelect}
          />
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
