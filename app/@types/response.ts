import { RecordDetail, Result, User } from './model'

export type getTeamsResponse = {
  teams: {
    id: string
    name: string
  }[]
}

export type getMembersResponse = {
  members: User[]
}

export type getTeamDetailsResponse = {
  details: {
    key: string
    value: string
  }[]
}

// user
export type getUserResponse = {
  id: string
  name: string
  email: string
}

export type signInResponse = {
  id: string
  name: string
  email: string
}

export type getRecordIndicesByTeamIdResponse = {
  record_indices: {
    id: string
    result: Result
    enemy_team_name: string
    place: string
    date: Date
  }[]
}

export type getRecordDetailsByRecordIdResponse = {
  record: RecordDetail
}

export type createRecordResponse = {
  id: string
  team_id: string
  team: {
    id: string
    name: string
  }
  place: string
  date: Date
  ends_data: JSON
  is_public: boolean
}
