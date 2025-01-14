import CommonButton from './commonButton';
import { RecordDetail, Shot } from '@/types/model';
import { Coordinate } from "../types";
import { SHEET_CONSTANTS } from "../constants";
import { stoneIsOut } from "../sheet";
import { Check } from 'lucide-react';

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  onStonePositionChange: (endIndex: number, shotIndex: number, isFriendStone: boolean, newStone: Coordinate) => void
};

export default function NextShotButton({
  record,
  setRecord,
  selectedEndIndex,
  setSelectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
  onStonePositionChange,
}: Props) {

  // Get whether the user has the first stone in this end or not.
  // In curling...
  // (1) the team that got score in the previous end has the first stone.
  // (2) if the previous end has no score, the team that had the first stone
  //     in the previous end has the first stone again.
  const getIsFirstInThisEnd = (endIndex: number): boolean => {
    if (endIndex === 0) {
      return record.is_first;
    }
    else if (record.ends_data[endIndex - 1].score === 0) {
      return getIsFirstInThisEnd(endIndex - 1);
    }
    else {
      return record.ends_data[endIndex - 1].score > 0;
    }
  }

  // Add a new stone at the initial position.
  const addStone = (nextEnd: boolean) => {

    const isFirstInThisEnd = getIsFirstInThisEnd(selectedEndIndex);
    const isFirstTurn = selectedShotIndex % 2 === 1;
    const isFriendTurn = isFirstInThisEnd ? isFirstTurn : !isFirstTurn;

    const newStone: Coordinate = {
      index: Math.floor((selectedShotIndex + 1) / 2),
      ...SHEET_CONSTANTS.INITIAL_STONE_POSITION,
    };

    if (nextEnd) {
      onStonePositionChange(
        selectedEndIndex + 1,
        0,
        isFriendTurn,
        newStone,
      );
    }
    else {
      onStonePositionChange(
        selectedEndIndex,
        selectedShotIndex + 1,
        isFriendTurn,
        newStone,
      );
    }
  };

  // Append a new shot to the record
  const appendNewShot = (record: RecordDetail, newShot: Shot): RecordDetail => {
    const endsData = record.ends_data;
    const latestEnd = endsData[endsData.length - 1];
    const newDataPerEnd = {
      score: latestEnd.score,
      shots: [...latestEnd.shots, newShot],
    };
    const newRecord = {
      ...record,
      ends_data: [...endsData.slice(0, endsData.length - 1), newDataPerEnd],
    };
    return newRecord;
  };

  const appendNewEnd = (record: RecordDetail): RecordDetail => {
    const newStone = {
      index: 0,
      ...SHEET_CONSTANTS.INITIAL_STONE_POSITION,
    };
    const isFirstInNextEnd = getIsFirstInThisEnd(selectedEndIndex + 1);
    const newDataPerEnd = {
      score: 0,
      shots: [
        {
          type: '',
          success_rate: 0,
          shooter: '',
          stones: {
            friend_stones: isFirstInNextEnd ? [newStone] : [],
            enemy_stones: isFirstInNextEnd ? [] : [newStone],
          },
        },
      ],
    }
    const newRecord = {
      ...record,
      ends_data: [...record.ends_data, newDataPerEnd],
    };
    return newRecord;
  };

  // Called when "Next Shot" button is clicked.
  // If the latest shot is selected, create a new one then select it.
  // Otherwise, select the next shot without changing the record.
  // NOTE: A new shot has the same stone positions as the previous shot.
  const nextShot = () => {
    const latestEndIndex = record?.ends_data?.length - 1;
    const latestEnd = record?.ends_data?.[latestEndIndex];
    const latestShotIndex = latestEnd?.shots.length - 1;
    if (selectedEndIndex === latestEndIndex && selectedShotIndex === latestShotIndex) {
      if (selectedShotIndex < 15) {
        setRecord(prevRecord => {
          const prevShots = prevRecord.ends_data?.[selectedEndIndex]?.shots ?? [];
          const prevStones = prevShots[prevShots.length - 1].stones;
          const friendStones = [...prevStones.friend_stones];
          const enemyStones = [...prevStones.enemy_stones];
          const newFriendStones = friendStones.filter(
            stone => !stoneIsOut(stone.r, stone.theta)
          )
          const newEnemyStones = enemyStones.filter(
            stone => !stoneIsOut(stone.r, stone.theta)
          );
          const newStones = {
            friend_stones: newFriendStones,
            enemy_stones: newEnemyStones,
          }
          const newShot: Shot = {
            type: '',
            success_rate: 0,
            shooter: '',
            stones: newStones,
          }
          return appendNewShot(prevRecord, newShot);
        })
        setSelectedShotIndex(selectedShotIndex + 1);
        addStone(false);
      }
      else {
        setRecord(prevRecord => {
          return appendNewEnd(prevRecord);
        })
        setSelectedShotIndex(0);
        setSelectedEndIndex(selectedEndIndex + 1);
      }
    }
    else {
      // Select the next shot without changing the record.
      if (selectedShotIndex === 15) {
        setSelectedShotIndex(0);
        setSelectedEndIndex(selectedEndIndex + 1);
      }
      else {
        setSelectedShotIndex(selectedShotIndex + 1);
      }
    }
  };

  const shotsNum = record?.ends_data?.[selectedEndIndex]?.shots.length ?? 0;

  return (
    <CommonButton
      onClick={nextShot}
      disabled={selectedShotIndex < shotsNum - 1}
      hoverText="Save Shot"
    >
      <Check />
    </CommonButton>
  );
}
