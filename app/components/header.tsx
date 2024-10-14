'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BellIcon, ConeIcon, SearchIcon} from '@/components/icons';
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
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teams or records"
              className="rounded-md bg-primary-foreground/10 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <BellIcon className="h-6 w-6" />
          </Button>
          <AuthDropdownMenu user={user} handleLogin={handleLogin} handleLogout={handleLogout} goToProfile={goToProfile} />
        </div>
      </header>
    </>
  );
}
