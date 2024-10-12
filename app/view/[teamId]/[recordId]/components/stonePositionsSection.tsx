import { Coordinate, RecordDetail, Shot } from '@/types/model';
import { SheetContainer } from './sheetContainer';
import React from 'react';
import { ShotSelector } from './shotSelector';

type Props = {
  record: RecordDetail; 
  shots: Shot[];
  selectedEndIndex: number; 
  selectedShotIndex: number; 
  onShotSelect: (shot: number) => void; 
  onStonePositionChange: (endIndex: number, shotIndex: number, isEnemyStone: boolean, newPosition: Coordinate) => void;
  isEditMode: boolean;
};

export default function StonePositionsSection({ shots, selectedShotIndex, onShotSelect }: Props) {
  const selectedShotData = shots[selectedShotIndex];

  return (
    <section className="w-full h-full">
      <h2 className="text-lg font-medium mb-4">Stone Positions</h2>
      {/* Shot selector dropdown menu */}
      <ShotSelector
        shots={shots}
        selectedShotIndex={selectedShotIndex}
        onShotSelect={onShotSelect} // ショット選択時のコールバックを渡す
      />
      <div className="h-full mt-4">
        <SheetContainer
          friendStones={selectedShotData?.stones?.friend_stones}
          enemyStones={selectedShotData?.stones?.enemy_stones}
        />
      </div>
    </section>
  );
}
