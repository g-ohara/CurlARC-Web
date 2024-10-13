
import { createRecordRequest, updateRecordRequest } from '@/types/request'
import { createRecordResponse, getRecordDetailsByRecordIdResponse, getRecordIndicesByTeamIdResponse, updateRecordResponse } from '@/types/response'
import { apiClient } from '@/utils/api/api'
import { cache } from 'react'

export const createRecord = async (
  teamId: string, record: createRecordRequest
): Promise<createRecordResponse> => {

  const res = await apiClient.post<createRecordResponse>(
    `/auth/records/${teamId}`, record
  )
  return res
}

export const getRecordsByTeamId = cache(async (teamId: string): Promise<getRecordIndicesByTeamIdResponse> => {
  const res = await apiClient.get<getRecordIndicesByTeamIdResponse>(`/auth/records/${teamId}`)
  return res
})

export const getRecordDetailsByRecordId = cache(
  async (recordId: string): Promise<getRecordDetailsByRecordIdResponse> => {
    const res = await apiClient.get<getRecordDetailsByRecordIdResponse>(`/auth/records/${recordId}/details`)
    return res
  }
)

export const updateRecord = async (recordId: string, record: updateRecordRequest): Promise<updateRecordResponse> => {
  const res = await apiClient.patch<updateRecordResponse>(`/auth/records/${recordId}`, record)
  return res
}

export const deleteRecord = async (recordId: string): Promise<any> => {
  const res = await apiClient.destroy<any>(`/auth/records/${recordId}`)
  return res
}
