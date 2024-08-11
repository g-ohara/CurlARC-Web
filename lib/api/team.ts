import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const getTeamsByUserId = cache(async (userId: string): Promise<getTeamsResponse> => {
  const res = await apiClient.get(`/auth/users/${userId}/teams`)
  return res
})

export const getMembersByTeamId = cache(async (teamId: string): Promise<getMembersResponse> => {
  const res = await apiClient.get(`/auth/teams/${teamId}`)
  return res
})

export const getTeamDetails = cache(async (teamId: string): Promise<getTeamDetailsResponse> => {
  // ここでチームの詳細情報を取得するAPIリクエストを実装
  // 例: const response = await fetch(`/api/teams/${teamId}`);
  // return response.json();
  const res: getTeamDetailsResponse = {
    status: 'success',
    data: {
      details: [
        { key: 'location', value: 'N/A' },
        { key: 'established', value: 'N/A' },
        { key: 'homeArena', value: 'N/A' },
        { key: 'sponsor', value: 'N/A' },
        { key: 'league', value: 'N/A' },
        { key: 'division', value: 'N/A' }
      ]
    }
  }
  return res
})
