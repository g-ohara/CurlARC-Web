import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const getRecordsByTeamId = cache(async (teamId: string): Promise<getRecordIndicesByTeamIdResponse> => {
  const res = await apiClient.get<getRecordIndicesByTeamIdResponse>(`/auth/records/${teamId}`)
  return res
})

export const getRecordDetailsByRecordId = cache(
  async (recordId: string): Promise<getRecordDetailsByRecordIdResponse> => {
    const res = await apiClient.get<getRecordDetailsByRecordIdResponse>(`/auth/records/${recordId}/detail`)
    return res
  }
)
