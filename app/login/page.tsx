'use client'
import type React from 'react'
import { useState, type FormEvent } from 'react'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/services/api/client/api'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault() // フォームのデフォルトの送信を防ぐ
    setError('') // エラーメッセージをリセット

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      // idTokenをバックエンドに送信する
      apiClient.post('/signin', { id_token: idToken })
      router.push('/profile')
    } catch (error) {
      setError(`ログインに失敗しました。\n${error}`)
    }
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100 text-black">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded bg-white p-8 shadow-md">
          <h2 className="mb-4 text-center text-2xl font-bold">Login to CurlARC</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </>
  )
}
