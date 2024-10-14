'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BellIcon, ConeIcon, SearchIcon } from '@/components/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import AuthDropdownMenu from './authDropdownmenu';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
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
            <ConeIcon className="h-8 w-8" />
            <span className="text-xl font-bold">CurlARC</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <AuthDropdownMenu user={user} handleLogin={handleLogin} handleLogout={handleLogout} goToProfile={goToProfile} />
        </div>
      </header>
    </>
  );
}
