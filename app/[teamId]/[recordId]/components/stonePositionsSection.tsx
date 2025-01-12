import { RecordDetail } from '@/types/model';
import React from 'react';
import { Sheet } from './sheet/sheet';

import { Coordinate, Stones } from '@/types/model';
import { SHEET_CONSTANTS } from './sheet/constants';

import PrevEndButton from './sheet/buttons/prevEndButton';
import FirstShotButton from './sheet/buttons/firstShotButton';
import PrevShotButton from './sheet/buttons/prevShotButton';
import NextShotButton from './sheet/buttons/nextShotButton';
import LastShotButton from './sheet/buttons/lastShotButton';
import NextEndButton from './sheet/buttons/nextEndButton';

import DeleteShotButton from './sheet/buttons/deleteShotButton';
import UndoButton from './sheet/buttons/undoButton';
import SaveShotButton from './sheet/buttons/saveShotButton';

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  isEditMode: boolean;
};

const calcScore = (stones: Stones) => {
  const friendStones = [...stones.friend_stones].sort((a, b) => a.r - b.r);
  const enemyStones = [...stones.enemy_stones].sort((a, b) => a.r - b.r);

  // A threshold to filter out out-of-the-house stones
  const maxR = SHEET_CONSTANTS.HOUSE_RADIUS + SHEET_CONSTANTS.STONE_RADIUS;

  // ex. myMin(1, 2) = 1
  //     myMin(1, undefined) = 1
  //     myMin(undefined, 2) = 2
  //     myMin(undefined, undefined) = undefined
  const myMin = (a: number, b: number) => a ? b ? Math.min(a, b) : a : b;

  // Count the number of my stones closer than the first opponent stone
  const calcMyScore = (
    myStones: Coordinate[],
    firstOpponentStoneR: number
  ) => {
    return myStones.filter(stone => stone.r < firstOpponentStoneR).length;
  }

  const firstEnemyStoneR = myMin(maxR, enemyStones[0]?.r);
  const firstFriendStoneR = myMin(maxR, friendStones[0]?.r);
  const friendScore = calcMyScore(friendStones, firstEnemyStoneR);
  const enemyScore = calcMyScore(enemyStones, firstFriendStoneR);
  return friendScore - enemyScore;
};

export default function StonePositionsSection({
  record,
  setRecord,
  selectedEndIndex,
  setSelectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
  isEditMode,
}: Props) {

  const onStonePositionChange = (
    endIndex: number,
    shotIndex: number,
    isFriendStone: boolean,
    newPosition: Coordinate
  ) => {
    setRecord(prevRecord => {
      const newEndsData = [...prevRecord.ends_data];
      const targetShot = newEndsData[endIndex].shots[shotIndex];
      const stoneKey = isFriendStone ? 'friend_stones' : 'enemy_stones';
      const oldStones = [...targetShot.stones[stoneKey]];
      const stoneExists = oldStones.some(stone => stone.index === newPosition.index);

      let newStones;

      // Add or move a stone.
      if (stoneExists) { // 既に存在する石の場合
        newStones = oldStones.map((stone) => {
          if (stone.index === newPosition.index) {
            return newPosition;
          } else {
            return stone;
          }
        }
        );
      } else {
        newStones = [...oldStones, newPosition];
      }

      // Update stones in current shot
      targetShot.stones[stoneKey] = newStones;

      // Update score in current end
      newEndsData[endIndex].score = calcScore(targetShot.stones);

      // Update result in current record
      const totalScore = newEndsData.reduce((acc, cur) => acc + cur.score, 0);
      const result = totalScore > 0 ? 'WIN' : totalScore < 0 ? 'LOSE' : 'DRAW';
      console.log(result);

      return {
        ...prevRecord,
        ends_data: newEndsData,
        result: result,
      };
    });
  };

  return (
    <section className="h-full mx-auto aspect-[5/9]">
      {isEditMode &&
        <div className="flex flex-wrap justify-between">
          <DeleteShotButton
            record={record}
            setRecord={setRecord}
            selectedEndIndex={selectedEndIndex}
            setSelectedEndIndex={setSelectedEndIndex}
            selectedShotIndex={selectedShotIndex}
            setSelectedShotIndex={setSelectedShotIndex}
          />
          <UndoButton
            record={record}
            setRecord={setRecord}
            selectedEndIndex={selectedEndIndex}
            selectedShotIndex={selectedShotIndex}
            onStonePositionChange={onStonePositionChange}
          />
          <SaveShotButton
            record={record}
            setRecord={setRecord}
            selectedEndIndex={selectedEndIndex}
            setSelectedEndIndex={setSelectedEndIndex}
            selectedShotIndex={selectedShotIndex}
            setSelectedShotIndex={setSelectedShotIndex}
            onStonePositionChange={onStonePositionChange}
          />
        </div>
      }
      <div className="h-full mt-4 ml-1">
        <Sheet
          className="h-full w-full"
          interactive={isEditMode}
          record={record}
          setRecord={setRecord}
          selectedEndIndex={selectedEndIndex}
          selectedShotIndex={selectedShotIndex}
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <PrevEndButton
          setSelectedShotIndex={setSelectedShotIndex}
          selectedEndIndex={selectedEndIndex}
          setSelectedEndIndex={setSelectedEndIndex}
        />
        <FirstShotButton
          selectedShotIndex={selectedShotIndex}
          setSelectedShotIndex={setSelectedShotIndex}
        />
        <PrevShotButton
          selectedEndIndex={selectedEndIndex}
          setSelectedEndIndex={setSelectedEndIndex}
          selectedShotIndex={selectedShotIndex}
          setSelectedShotIndex={setSelectedShotIndex}
        />
        <NextShotButton
          selectedShotIndex={selectedShotIndex}
          setSelectedShotIndex={setSelectedShotIndex}
          shotsNum={record.ends_data[selectedEndIndex].shots.length}
        />
        <LastShotButton
          selectedShotIndex={selectedShotIndex}
          setSelectedShotIndex={setSelectedShotIndex}
          shotsNum={record.ends_data[selectedEndIndex].shots.length}
        />
        <NextEndButton
          setSelectedShotIndex={setSelectedShotIndex}
          selectedEndIndex={selectedEndIndex}
          setSelectedEndIndex={setSelectedEndIndex}
          endsNum={record.ends_data.length}
        />
      </div>
    </section >
  );
}
