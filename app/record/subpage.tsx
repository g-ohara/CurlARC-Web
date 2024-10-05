"use client";

import { useState, useEffect } from 'react';
import RecordSheet from './sheet';
import Menu from './menu';
import { SubmitButton } from './components/submitButton'; // SubmitButton コンポーネントをインポート
import { DataPerEnd } from '@/types/model';

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
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // リサイズロジック
  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth / 3);
      setHeight(window.innerHeight - 200);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="z-0 grid w-full p-7 md:grid-cols-2">
      <RecordSheet
        width={width}
        height={height}
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
          setDate={setDate}
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
