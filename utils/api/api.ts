import { FetchError } from './fetchError'
import { toJSONFormat } from './toJSONFormat'
import Cookies from 'js-cookie'

const baseURL: string | undefined =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? process.env.NEXT_PUBLIC_API_MOCK_ENDPOINT
    : process.env.NEXT_PUBLIC_API_ENDPOINT || undefined

const makeRequestBody = <T = object>(body: T) => {
  if (!body) return null
  return JSON.stringify(toJSONFormat(body))
}

const getAuthHeaders = (jwt: string | undefined) => {
  const JWT = Cookies.get('jwt') ?? jwt

  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  if (JWT) {
    headers.append('Authorization', `Bearer ${JWT}`)
  }
  return headers
}

type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const http = async <T>(path: string, method: TMethod, body?: any, jwt?: string) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    mode: 'cors',
    body: makeRequestBody(body),
    credentials: 'include',
    headers: getAuthHeaders(jwt)
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

const get = async <T = any>(path: string, jwt?: string): Promise<T> => {
  return await http<T>(path, 'GET', null, jwt)
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
