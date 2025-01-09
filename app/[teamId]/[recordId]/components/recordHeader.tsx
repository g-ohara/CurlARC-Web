import React from 'react'
import { Team, RecordDetail } from '@/types/model'

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  friendTeam: Team
  record: RecordDetail
}

export default function RecordHeader({ friendTeam, record }: Props) {

  const ReturnButton = ({ className }: { className?: string }) => {
    const router = useRouter();
    const handleClick = () => {
      router.push(`/${friendTeam.id}`);
    };
    return (
      <Button variant="outline" className={className} onClick={handleClick}>
        <ChevronLeft />
      </Button>
    )
  }

  return (
    <div className="flex items-center">
      <ReturnButton className="px-2 mr-5" />
      <h1 className="text-3xl font-semibold">
        {friendTeam.name} vs {record.enemy_team_name} @ {record.place}
      </h1>
    </div>
  )
}
