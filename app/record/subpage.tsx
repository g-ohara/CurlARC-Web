"use client";

import { useState, useEffect } from 'react';
import { SubmitButton } from './components/submitButton'; // SubmitButton コンポーネントをインポート
import { DataPerEnd } from '@/types/model';
import Menu from './components/menu';
import RecordSheet from './components/sheet';

type SubpageProps = {
  teams: {
    id: string;
    name: string;
  }[];
};

export default function Subpage(props: SubpageProps) {
  const [teamId, setTeamId] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [place, setPlace] = useState('');
  const [ends_data, setEndsData] = useState<DataPerEnd[]>([]);
  const [shotSaved, setShotSaved] = useState(false);
  const [putStone, setPutStone] = useState(false);

  return (
    <div className="z-0 grid w-full p-7 md:grid-cols-2">
      <RecordSheet
        putStone={putStone}
        setPutStone={setPutStone}
        setEndsData={setEndsData}
        isSubmitted={false} // Submit状態は個別に管理
        shotSaved={shotSaved}
      />
      <div className="z-0 grid w-full p-7">
        <Menu
          putStone={putStone}
          setPutStone={setPutStone}
          teams={props.teams}
          setTeamId={setTeamId}
          date={date}
          setDate={setDate}
          place={place}
          setPlace={setPlace}
          isSubmitted={false}
          setShotSaved={setShotSaved}
        />
        <SubmitButton
          teamId={teamId}
          place={place}
          date={date}
          ends_data={ends_data}
        />
      </div>
    </div>
  );
}
