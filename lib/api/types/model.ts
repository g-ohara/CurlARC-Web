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
  Score: number
  Shots: Shot[]
}

type Shot = {
  Type: string
  SuccessRate: number
  Shooter: string
  Stones: Stones
}

type Stones = {
  FriendStones: Coordinate[]
  EnemyStones: Coordinate[]
}

type Coordinate = {
  Index: number
  R: number
  Theta: number
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
