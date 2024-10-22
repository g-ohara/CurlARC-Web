'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import AuthDropdownMenu from './authDropdownmenu';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  }

  const goToProfile = () => {
    router.push('/profile');
  };
  const user = session?.user;

  return (
    <>
      <header className={`${className}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/full-logo.svg" alt="CurlARC" className="h-10" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <AuthDropdownMenu user={user} handleLogin={handleLogin} handleLogout={handleLogout} goToProfile={goToProfile} />
        </div>
      </header>
    </>
  );
}
