type ScoreData = {
  teamName: string
  color: string
  scores: number[]
  total: number
}

type TeamScore = {
  friend: ScoreData
  enemy: ScoreData
}

type ScoreRow = {
  team: string
  scores: number[]
  total: number
}

interface ScoreCellProps {
  score: number | string
}

interface ScoreBoardProps {
  friendScore: ScoreData
  enemyScore: ScoreData
}
