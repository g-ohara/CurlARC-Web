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
  is_public: boolean
}

type DataPerEnd = {
  score: number
  shots: Shot[]
}

type Shot = {
  type: string
  success_rate: number
  shooter: string
  stones: Stones
}

type Stones = {
  friend_stones: Coordinate[]
  enemy_stones: Coordinate[]
}

type Coordinate = {
  index: number
  r: number
  theta: number
}

export type Team = {
  id: string
  name: string
  members: User[]
  details: {
    key: string
    value: string
  }[]
}
