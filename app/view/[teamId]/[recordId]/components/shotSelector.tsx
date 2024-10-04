import React from 'react';
import { Shot } from '@/types/model';

type ShotSelectorProps = {
  shots: Shot[]; // ショットの配列
  selectedShotIndex: number; // 選択されたショットのインデックス
  onShotSelect: (shotId: number) => void; // ショット選択時のコールバック
};

export const ShotSelector: React.FC<ShotSelectorProps> = ({ shots, selectedShotIndex, onShotSelect }) => {
  return (
    <select
      value={selectedShotIndex}
      onChange={(e) => onShotSelect(Number(e.target.value))}
      className="border border-gray-300 rounded-md p-2"
    >
      {shots.map((shot, index) => ( // indexを取得
        <option key={index+1} value={index+1}> 
          {index+1} - {shot.type}: {shot.shooter}
        </option>
      ))}
    </select>
  );
};
