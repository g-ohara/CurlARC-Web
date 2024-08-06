interface getTeamsResponse {
  status: string
  data: {
    team_ids: string[]
  }
}

interface getUserResponse {
  status: string
  data: {
    id: string
    name: string
    email: string
  }
}