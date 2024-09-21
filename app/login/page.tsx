"use client"

import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
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
				<Button onClick={() => signIn('google', {}, { prompt: 'login' })}>
					Googleでログイン
				</Button>
			</div>
		);
	}

	if (session) {
		return (
			<div>
				<p>あなたはログインしています</p>
				<p>ようこそ、{session.user?.name}さん</p>
				<Button onClick={() => signOut()}>ログアウト</Button>
			</div>
		);
	}
	return null;
}
