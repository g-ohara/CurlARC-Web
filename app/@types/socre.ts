type ScoreData = {
  team: string
  color: string
  scores: (number | string)[]
  total: number
}

type TeamScore = {
  friend: ScoreData
  enemy: ScoreData
}

type ScoreRow = {
  team: string
  scores: (number | string)[]
  total: number
}

interface ScoreCellProps {
  score: number | string
}

interface ScoreBoardProps {
  friendScore: ScoreData
  enemyScore: ScoreData
}
