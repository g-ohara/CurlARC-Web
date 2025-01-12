import React from 'react'
import { Team, RecordDetail } from '@/types/model'
import SettingMenu from './settingMenu';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  friendTeam: Team
  record: RecordDetail
  isEditMode: boolean
  toggleEditMode: () => void
}

export default function RecordHeader({
  friendTeam,
  record,
  isEditMode,
  toggleEditMode,
}: Props) {

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
      <ReturnButton className="px-2" />
      <h1 className="text-3xl font-semibold mx-5">
        {friendTeam.name} vs {record.enemy_team_name} @ {record.place}
      </h1>
      <SettingMenu
        isEditMode={isEditMode}
        toggleEditMode={toggleEditMode}
        recordId={record.id}
      />
    </div>
  )
}
