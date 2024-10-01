'use client'

import React, { FC, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
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
  <motion.td 
    className={`border-b border-muted px-1 py-1 text-center text-xs sm:text-sm md:text-base
      ${isHeader ? 'cursor-pointer' : ''}
      ${isSelected ? 'bg-yellow-300' : ''}`}
    onClick={onClick}
    whileHover={isHeader ? { scale: 1.05 } : {}}
    whileTap={isHeader ? { scale: 0.95 } : {}}
    aria-label={ariaLabel}
    role={isHeader ? 'button' : undefined}
  >
    {score}
  </motion.td>
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
  selectedRound: number | null
  onRoundSelect: (round: number) => void
}

const ScoreRow: FC<ScoreRowProps> = ({ teamName, color, scores, total, selectedRound, onRoundSelect }) => {
  const isFirstStone = scores[0] === -1
  const displayScores = scores.slice(1)  // 2番目の要素から表示

  return (
    <tr>
      <TeamNameCell teamName={teamName} color={color} />
      <FirstStoneCell isFirstStone={isFirstStone} />
      {displayScores.map((score, index) => (
        <ScoreCell
          key={`${teamName}-${index}`}
          score={score}
          isSelected={selectedRound === index + 1}
          onClick={() => onRoundSelect(index)}
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
  customColors = {}
}) => {
  const [selectedRound, setSelectedRound] = useState<number>(0)
  const roundCount = Math.max(friendScore.scores.length, enemyScore.scores.length) - 1  // 先攻/後攻の要素を除く
  const headers = useMemo(() => Array.from({ length: roundCount }, (_, i) => i + 1), [roundCount])
  const isMobile = useMediaQuery({ maxWidth: 640 })

  const handleRoundSelect = (round: number) => {
    setSelectedRound(round)
    onEndSelect(round)
  }

  // デフォルトカラーのメモ化
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
            {headers.map((header) => (
              <motion.th
                key={`header-${header}`} 
                className={`border-b border-muted px-1 py-1 text-center text-xs sm:text-sm md:text-base cursor-pointer 
                  ${selectedRound === header ? `${colors.selectedBorder} border-2` : `${colors.hoverBg}`}`}
                onClick={() => handleRoundSelect(header)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Select round ${header}`}
                role="button"
              >
                {isMobile ? header : `${header}`}
              </motion.th>
            ))}
            <th className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <ScoreRow 
            key={`team-${friendScore.teamName}`} 
            {...friendScore} 
            selectedRound={selectedRound}
            onRoundSelect={handleRoundSelect}
          />
          <ScoreRow 
            key={`team-${enemyScore.teamName}`} 
            {...enemyScore} 
            selectedRound={selectedRound}
            onRoundSelect={handleRoundSelect}
          />
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
