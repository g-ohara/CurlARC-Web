import { Coordinate, RecordDetail, Shot } from '@/types/model';
import React from 'react';
import { ShotSelector } from './shotSelector';
import { Sheet } from '@/components/sheet/sheet';

type Props = {
  record: RecordDetail; 
  selectedEndIndex: number; 
  selectedShotIndex: number; 
  onShotSelect: (shot: number) => void; 
  onStonePositionChange: (endIndex: number, shotIndex: number, isFriendStone: boolean, newPosition: Coordinate) => void;
  isEditMode: boolean;
};

export default function StonePositionsSection({ record, selectedEndIndex, selectedShotIndex, onShotSelect, onStonePositionChange, isEditMode }: Props) {
  const selectedShotsData = record.ends_data?.[selectedEndIndex]?.shots ?? [];
  const selectedShotData = selectedShotsData[selectedShotIndex];

  return (
    <section className="w-full h-full">
      <h2 className="text-lg font-medium mb-4">Stone Positions</h2>
      <ShotSelector
        shots={selectedShotsData}
        selectedShotIndex={selectedShotIndex}
        onShotSelect={onShotSelect}
      />
      <div className="h-full mt-4">
        <Sheet
          className="h-full w-full"
          friendStones={selectedShotData?.stones.friend_stones}
          enemyStones={selectedShotData?.stones.enemy_stones}
          friendIsRed={true}
          interactive={isEditMode}
          selectedEndIndex={selectedEndIndex}
          selectedShotIndex={selectedShotIndex}
          onStonePositionChange={onStonePositionChange}
        />
      </div>
    </section>
  );
}
