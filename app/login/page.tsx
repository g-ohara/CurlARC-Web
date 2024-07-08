"use client";
import type React from "react";
import { useState, type FormEvent } from "react"
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Main: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        setError(""); // エラーメッセージをリセット

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // ログイン成功後の処理（例：ホームページへのリダイレクト）
            setError("ログインに成功しました。"); // エラーメッセージを設定
            console.error(error);
        } catch (error) {
            setError("ログインに失敗しました。"); // エラーメッセージを設定
            console.error(error);
        }
    };

    return (
        <div className="h-screen bg-[url('/assets/bg.jpg')] bg-cover bg-right">
            <h1 className="mb-4 text-4xl font-extrabold leading-none \
                        tracking-tight text-gray-900 md:text-5xl lg:text-6xl \
                        dark:text-white">
                Welcome to Login Page!
            </h1>
            <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 \
                        xl:px-48 dark:text-gray-400">
                This is login page for <a href="/" className="text-blue-600 hover:underline">CurlARC</a>.
            </p>
            <form onSubmit={handleLogin} className="flex flex-col items-center space-y-6">
                <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ color: "black" }}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="mt-1 block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ color: "black" }}
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Sign In
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default Main;