import { FetchError } from '../utils/fetchError'
import { toJSONFormat } from '../utils/toJSONFormat'

const baseURL: string | undefined =
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
    ? process.env.NEXT_PUBLIC_API_MOCK_ENDPOINT
    : process.env.NEXT_PUBLIC_API_ENDPOINT || undefined

const makeRequestBody = <T = object>(body: T) => {
  if (!body) return null
  return JSON.stringify(toJSONFormat(body))
}

type TMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const http = async (path: string, method: TMethod, body?: any) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    mode: 'cors',
    body: makeRequestBody(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    const data: { status: string; message: string } = await res.json()
    throw new FetchError(data.message, res.status)
  }

  if (res.status === 204) return {}

  return res.json()
}

const get = async (path: string) => {
  const data = await http(path, 'GET')
  return data
}

const post = async (path: string, body?: any) => {
  const data = await http(path, 'POST', body)
  return data
}

const patch = async (path: string, body?: any) => {
  const data = await http(path, 'PATCH', body)
  return data
}

const destroy = async (path: string) => {
  const data = await http(path, 'DELETE')
  return data
}

export const apiClient = {
  get,
  post,
  patch,
  destroy
}
