import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const createTeam = async (teamName: string): Promise<any> => {
  const res = await apiClient.post<any>(`/auth/teams/`, { name: teamName })
  return res
}

export const deleteTeam = async (teamId: string): Promise<any> => {
  const res = await apiClient.destroy<any>(`/auth/teams/${teamId}`)
  return res
}

export const getTeamsByUserId = cache(async (jwt: string): Promise<getTeamsResponse> => {
  const res = await apiClient.get<getTeamsResponse>(`/auth/users/me/teams`, jwt, 'getTeamsByUserId')
  return res
})

export const getMembersByTeamId = cache(async (teamId: string, jwt: string): Promise<getMembersResponse> => {
  const res = await apiClient.get<getMembersResponse>(`/auth/teams/${teamId}`, jwt)
  return res
})

export const getTeamDetails = cache(async (teamId: string): Promise<getTeamDetailsResponse> => {
  // ここでチームの詳細情報を取得するAPIリクエストを実装
  // 例: const response = await fetch(`/api/teams/${teamId}`);
  // return response.json();
  const res: getTeamDetailsResponse = {
    details: [
      { key: 'location', value: 'N/A' },
      { key: 'established', value: 'N/A' },
      { key: 'homeArena', value: 'N/A' },
      { key: 'sponsor', value: 'N/A' },
      { key: 'league', value: 'N/A' },
      { key: 'division', value: 'N/A' }
    ]
  }
  return res
})
