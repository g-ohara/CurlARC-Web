"use client";
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, getIdToken, deleteUser } from 'firebase/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamIds, setTeamIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let userCredential;

    // Firebaseユーザーの作成
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to create user on Firebase');
      console.error(err);
      return;
    }

    // ユーザー情報をバックエンドに保存
    try {
      const idToken = await getIdToken(userCredential.user);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          id_token: idToken,
          name,
          email,
          team_ids: teamIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user on backend');
      }

      // サインアップ成功後の処理（例：リダイレクト） 
      console.log('Sign up success');
    } catch (err) {
      setError('Sign up failed');
      console.error(err);

      // Firebaseユーザーの削除
      if (userCredential) {
        await deleteUser(userCredential.user);
        console.log('Firebase user deleted due to backend signup failure');
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
        <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Register to CurlARC</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </>

  );
};

