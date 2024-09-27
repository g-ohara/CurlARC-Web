import React, { FC, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

interface ScoreData {
  team: string
  color: string
  scores: number[]
  total: number
}

interface ScoreBoardProps {
  friendScore: ScoreData
  enemyScore: ScoreData
  onRoundSelect?: (round: number) => void
  customColors?: {
    headerBg?: string
    selectedBorder?: string
    hoverBg?: string
  }
}

const ScoreCell: FC<{
  score: number | string
  isHeader: boolean
  isSelected: boolean
  onClick?: () => void
  ariaLabel: string
}> = ({ score, isHeader, isSelected, onClick, ariaLabel }) => (
  <motion.td 
    className={`border-b border-muted px-1 py-1 text-center text-xs sm:text-sm md:text-base
      ${isHeader ? 'cursor-pointer' : ''}
      ${isSelected ? 'border-yellow-300 border-2' : ''}`}
    onClick={onClick}
    whileHover={isHeader ? { scale: 1.05 } : {}}
    whileTap={isHeader ? { scale: 0.95 } : {}}
    aria-label={ariaLabel}
    role={isHeader ? 'button' : undefined}
  >
    {score}
  </motion.td>
)

const TeamNameCell: FC<{ team: string; color: string }> = ({ team, color }) => (
  <td className={`border-b border-muted bg-${color}-500 px-2 py-1 text-xs sm:text-sm md:text-base font-bold text-${color}-50`}>
    <div className="max-w-[100px] md:max-w-[150px] overflow-x-auto whitespace-nowrap scrollbar-hide">
      {team}
    </div>
  </td>
)

const FirstStoneCell: FC<{ isFirstStone: boolean }> = ({ isFirstStone }) => (
  <td className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base">
    {isFirstStone ? '●' : ''}
  </td>
)

const ScoreRow: FC<ScoreData & {
  selectedRound: number | null
  onRoundSelect: (round: number) => void
}> = ({ team, color, scores, total, selectedRound, onRoundSelect }) => {
  const isFirstStone = scores[0] === -1
  const displayScores = scores.slice(1)  // 2番目の要素から表示

  return (
    <tr>
      <TeamNameCell team={team} color={color} />
      <FirstStoneCell isFirstStone={isFirstStone} />
      {displayScores.map((score, index) => (
        <ScoreCell
          key={`${team}-${index}`}
          score={score}
          isHeader={false}
          isSelected={selectedRound === index}
          onClick={() => onRoundSelect(index)}
          ariaLabel={`${team} score for round ${index + 1}: ${score}`}
        />
      ))}
      <td className="border-b border-muted px-2 py-1 text-center text-xs sm:text-sm md:text-base font-bold">{total}</td>
    </tr>
  )
}

const ScoreBoard: FC<ScoreBoardProps> = ({
  friendScore, 
  enemyScore, 
  onRoundSelect,
  customColors = {}
}) => {
  const [selectedRound, setSelectedRound] = useState<number>(0)
  const roundCount = Math.max(friendScore.scores.length, enemyScore.scores.length) - 1  // 先攻/後攻の要素を除く
  const headers = useMemo(() => Array.from({ length: roundCount }, (_, i) => i + 1), [roundCount])
  const isMobile = useMediaQuery({ maxWidth: 640 })

  const handleRoundSelect = (round: number) => {
    setSelectedRound(round)
    onRoundSelect?.(round)
  }

  const {
    headerBg = 'bg-gray-100',
    selectedBorder = 'border-yellow-300',
    hoverBg = 'hover:bg-gray-200'
  } = customColors

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={headerBg}>
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
                  ${selectedRound + 1 === header ? `${selectedBorder} border-2` : `${hoverBg}`}`}
                onClick={() => handleRoundSelect(header - 1)}
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
            key={`team-${friendScore.team}`} 
            {...friendScore} 
            selectedRound={selectedRound}
            onRoundSelect={handleRoundSelect}
          />
          <ScoreRow 
            key={`team-${enemyScore.team}`} 
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