export type User = {
  id: string
  name: string
  email: string
}

export type Result = 'WIN' | 'DRAW' | 'LOSE'

export type RecordIndex = {
  id: string
  result: Result
  enemy_team_name: string
  place: string
  date: Date
}

export type RecordDetail = {
  id: string
  team_id: string
  result: Result
  enemy_team_name: string
  place: string
  date: Date
  ends_data: DataPerEnd[]
  is_first: boolean
  is_public: boolean
}

export type DataPerEnd = {
  score: number
  shots: Shot[]
}

export type Shot = {
  type: string
  success_rate: number
  shooter: string
  stones: Stones
}

export type Stones = {
  friend_stones: Coordinate[]
  enemy_stones: Coordinate[]
}

export type Coordinate = {
  index: number
  r: number
  theta: number
}

export type Team = {
  id: string
  name: string
}
