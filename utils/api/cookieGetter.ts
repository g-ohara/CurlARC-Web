'use server'

import { cookies } from 'next/headers'

export async function getJWT() {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')?.value
  return jwt
}
