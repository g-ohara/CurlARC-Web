'use server'

import { cookies } from 'next/headers'

export async function getBackendAccessToken() {
  const cookieStore = cookies()
  const backendAccessToken = cookieStore.get('backend_access_token')?.value
  return backendAccessToken
}