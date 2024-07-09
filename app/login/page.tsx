"use client";
import type React from "react";
import { useEffect, useState, type FormEvent } from "react"
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ
    setError(""); // エラーメッセージをリセット

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // idTokenをバックエンドに送信する
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      if (response.ok) {
        const userData = await response.json();
        // ログイン成功後の処理（例：ユーザー情報を表示し、ホームページにリダイレクト）
        console.log('ログインに成功しました。', userData);
        // setLoginSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "ログインに失敗しました。"); // エラーメッセージを設定
      }
    } catch (error) {
      setError("ログインに失敗しました。"); // エラーメッセージを設定
      console.error(error);
    }
  };

  // ログイン成功時にのみリダイレクトを実行
  useEffect(() => {
    if (loginSuccess) {
      Router.push('/home');
    }
  }, [loginSuccess]);

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to CurlARC</h2>
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
          Login
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
    </>
  );
};

