'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createUserWithEmailAndPassword, deleteUser, getIdToken } from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { apiClient } from '@/utils/api/api'
import { useRouter } from 'next/navigation'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setError('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    let userCredential

    // Firebaseユーザーの作成
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError('Failed to create user on Firebase')
      console.error(err)
      return
    }

    // ユーザー情報をバックエンドに保存
    try {
      const idToken = await getIdToken(userCredential.user)

      await apiClient.post('/signup', {
        id_token: idToken,
        email
      })
      router.push('/profile')
      onClose() // 登録成功後にモーダルを閉じる
    } catch (err) {
      setError(`Signup failed ${err}`)

      // Firebaseユーザーの削除
      if (userCredential) {
        await deleteUser(userCredential.user)
        console.log('Firebase user deleted due to backend signup failure')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black absolute inset-0 bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white z-10 w-full max-w-md rounded-lg p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full"
          />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Register
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
          {error && <div className="text-red-500 border-red-500 rounded mt-4 border p-2">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default RegisterModal
