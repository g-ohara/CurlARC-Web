import { useSession } from 'next-auth/react'
import { FetchError } from './fetchError'
import { toJSONFormat } from './toJSONFormat'

const baseURL: string | undefined =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? process.env.NEXT_PUBLIC_API_MOCK_ENDPOINT
    : process.env.NEXT_PUBLIC_API_ENDPOINT || undefined

const makeRequestBody = <T = object>(body: T) => {
  if (!body) return null
  return JSON.stringify(toJSONFormat(body))
}

const getAuthHeaders = async () => {
  const {data: session} = useSession()
  const JWT = session?.accessToken

  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (JWT) {
    headers.append('Authorization', `Bearer ${JWT}`)
  }
  return headers
}

type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const http = async <T>(path: string, method: TMethod, body?: any, tags?: string) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    mode: 'cors',
    body: makeRequestBody(body),
    credentials: 'include',
    headers: await getAuthHeaders(),
    next: {
      tags: [tags ?? '']
    }
  })
  if (!res.ok) {
    const data: { status: string; error: string } = await res.json()
    throw new FetchError(data.error, res.status)
  }

  if (res.status === 204) return {} as T
  // const tmp = toJSONFormat((await res.json()).data) as T
  const tmp = (await res.json()).data as T
  console.log(path, method, tmp)

  return tmp
}

const get = async <T = any>(path: string, tags?: string): Promise<T> => {
  return await http<T>(path, 'GET', null, tags)
}

const post = async <T = any>(path: string, body?: any): Promise<T> => {
  return await http<T>(path, 'POST', body)
}

const patch = async <T = any>(path: string, body?: any): Promise<T> => {
  return await http<T>(path, 'PATCH', body)
}

const destroy = async <T = any>(path: string): Promise<T> => {
  return await http<T>(path, 'DELETE')
}

export const apiClient = {
  get,
  post,
  patch,
  destroy
}
