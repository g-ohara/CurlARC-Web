"use client"

import { signIn, useSession } from 'next-auth/react';
import React from 'react';

export default function Login() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status !== 'authenticated') {
		return (
			<div>
				<p>あなたはログインしていません</p>
				<button onClick={() => signIn('google', {}, { prompt: 'login' })}>
					Googleでログイン
				</button>
			</div>
		);
	}
	return null;
}
