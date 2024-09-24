'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInWithGoogleLogo } from './components/googleLogo';

export default function Login() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardContent className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </CardContent>
      </Card>
    );
  }

  if (status !== 'authenticated') {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login To CurlARC!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
					<SignInWithGoogleLogo handleFunction={() => signIn('google')} />
        </CardContent>
      </Card>
    );
  }

  if (session) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">ようこそ</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-2 text-center">あなたはログインしています</p>
          <p className="mb-4 text-center font-semibold">{session.user?.name}さん</p>
          <Button onClick={() => signOut()} variant="outline">ログアウト</Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}