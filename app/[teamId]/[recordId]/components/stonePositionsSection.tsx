import { RecordDetail } from '@/types/model';
import React from 'react';
import { Sheet } from './sheet/sheet';

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  isEditMode: boolean;
};

export default function StonePositionsSection({
  record,
  setRecord,
  selectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
  isEditMode,
}: Props) {

  const selectedShotsData = record.ends_data?.[selectedEndIndex]?.shots ?? [];
  const selectedShotData = selectedShotsData[selectedShotIndex];

  return (
    <section className="w-full h-full">
      <h2 className="text-xl font-medium mb-4">Stone Positions</h2>
      <div className="h-full mt-4">
        <Sheet
          className="h-full w-full"
          friendStones={selectedShotData?.stones.friend_stones ?? []}
          enemyStones={selectedShotData?.stones.enemy_stones ?? []}
          friendIsRed={true}
          interactive={isEditMode}
          record={record}
          setRecord={setRecord}
          selectedEndIndex={selectedEndIndex}
          selectedShotIndex={selectedShotIndex}
          setSelectedShotIndex={setSelectedShotIndex}
        />
      </div>
    </section>
  );
}
