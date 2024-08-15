interface User {
  id: string
  name: string
  email: string
}

interface getTeamsResponse {
  teams: {
    id: string
    name: string
  }[]
}

interface getMembersResponse {
  members: User[]
}

interface getTeamDetailsResponse {
  details: {
    key: string
    value: string
  }[]
}

// user
interface getUserResponse {
  id: string
  name: string
  email: string
}

interface signInResponse {
  id: string
  name: string
  email: string
}
