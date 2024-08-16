import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const getRecordsByTeamId = cache(async (teamId: string): Promise<getRecordsByTeamIdResponse> => {
  const res = await apiClient.get<getRecordsByTeamIdResponse>(`/auth/records/${teamId}`)
  return res
})
