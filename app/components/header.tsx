'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import AuthDropdownMenu from './authDropdownmenu';
import { AlignJustify, X, Users } from 'lucide-react';
import { getTeamsByUserId, getInvitedTeams } from '@/lib/api/team';
import { Team } from '@/types/model';
import CreateTeamsButton from './createTeamsButton';
import AcceptInvitationButton from './acceptInvitationButton';
import { toast } from 'sonner';

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [invitedTeams, setInvitedTeams] = useState<Team[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const teamsRes = await getTeamsByUserId();
          setTeams(teamsRes.teams);

          const invitedTeamsRes = await getInvitedTeams();
          setInvitedTeams(invitedTeamsRes.teams);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      }
    };

    fetchData();
  }, [session, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
    setIsMenuOpen(false);
  }

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/');
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  const user = session?.user;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-nav');
      if (nav && !nav.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <header className={`relative ${className}`}>
        <div className="flex gap-4">
          <button
            className="p-2 hover:bg-gray-300 rounded-lg"
            onClick={() => {
              if (!session) {
                toast.error('You need to be logged in to view your teams.', {
                  position: 'top-center',
                });
                return;
              }
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            <AlignJustify className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/assets/full-logo.svg" alt="CurlARC" className="h-10" />
            </Link>
          </div>
        </div>


        <div className="flex items-center gap-4">
          <AuthDropdownMenu
            user={user}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            goToProfile={goToProfile}
          />
        </div>

        {/* Navigation Menu */}
        <div
          id="nav"
          className={`text-black fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="p-4">
            <button
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mt-8">
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-semibold text-lg">My Teams</span>
                </div>
                <ul className="space-y-2">
                  {teams?.map((team) => (
                    <li key={team.id}>
                      <Link
                        href={`/${team.id}`}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 transition text-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {team.name}
                      </Link>
                    </li>
                  ))}
                  <CreateTeamsButton handleRefresh={handleRefresh} />
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  <span className="font-semibold text-lg">Invited Teams</span>
                </div>
                <ul className="space-y-2">
                  {invitedTeams?.map((team) => (
                    <li key={team.id}>
                      <div className="flex items-center gap-3 px-3 py-2">
                        {team.name}
                        <AcceptInvitationButton teamId={team.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
}
