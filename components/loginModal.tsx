'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useApp } from '@/app/context/appProvider'
import { apiClient } from '@/utils/api/api'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useApp()
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setError('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      // idTokenをバックエンドに送信する
      await apiClient.post('/signin', { id_token: idToken })
      login({ name: email, avatarUrl: '/placeholder.svg' })
      router.push('/profile')
      onClose() // ログイン成功時にモーダルを閉じる
    } catch (error) {
      setError(`ログインに失敗しました。\n${error}`)
      // エラーが発生した場合、モーダルを閉じない
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-gray-500/50 fixed inset-0 z-10 bg-opacity-20 transition-all" onClick={onClose}></div>
      <div className="bg-white z-20 w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full"
            />
          </div>
          <div className="mb-4 flex gap-4">
            <Button type="submit" className="flex-1">
              Login
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default LoginModal
