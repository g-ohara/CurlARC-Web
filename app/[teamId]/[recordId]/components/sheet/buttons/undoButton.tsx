import CommonButton from './commonButton';
import { RecordDetail, Shot } from '@/types/model';
import { Coordinate } from "../types";
import { SHEET_CONSTANTS } from "../constants";
import { stoneIsOut } from "../sheet";
import { Undo } from 'lucide-react';

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  selectedShotIndex: number;
  onStonePositionChange: (endIndex: number, shotIndex: number, isFriendStone: boolean, newStone: Coordinate) => void
};

export default function DeleteShotButton({
  record,
  setRecord,
  selectedEndIndex,
  selectedShotIndex,
  onStonePositionChange,
}: Props) {

  const undo = () => {
    if (selectedShotIndex === 0) {
      setRecord(prevRecord => {
        const newStones = {
          friend_stones: [],
          enemy_stones: [],
        }
        const newShot: Shot = {
          type: '',
          success_rate: 0,
          shooter: '',
          stones: newStones,
        }
        return {
          ...prevRecord,
          ends_data: [
            ...prevRecord.ends_data.slice(0, selectedEndIndex),
            {
              ...prevRecord.ends_data[selectedEndIndex],
              shots: [
                newShot,
              ],
            },
          ],
        };
      })
    }
    else {
      setRecord(prevRecord => {
        const prevShots = prevRecord.ends_data?.[selectedEndIndex]?.shots ?? [];
        const prevStones = prevShots[prevShots.length - 1 - 1].stones;
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
        return {
          ...prevRecord,
          ends_data: [
            ...prevRecord.ends_data.slice(0, selectedEndIndex),
            {
              ...prevRecord.ends_data[selectedEndIndex],
              shots: [
                ...prevRecord.ends_data[selectedEndIndex].shots.slice(0, selectedShotIndex),
                newShot,
              ],
            },
          ],
        };
      })
    }
    const isFirstInThisEnd = record.is_first;
    const isFirstTurn = selectedShotIndex % 2 === 0;
    const isFriendTurn = isFirstInThisEnd ? isFirstTurn : !isFirstTurn;

    const newStone: Coordinate = {
      index: Math.floor(selectedShotIndex / 2),
      ...SHEET_CONSTANTS.INITIAL_STONE_POSITION,
    };
    onStonePositionChange(
      selectedEndIndex,
      selectedShotIndex,
      isFriendTurn,
      newStone,
    );
  }

  const endsNum = record.ends_data.length;
  const shotsNum = record.ends_data[record.ends_data.length - 1].shots.length;

  return (
    <CommonButton
      onClick={undo}
      disabled={
        selectedShotIndex < shotsNum - 1 || selectedEndIndex < endsNum - 1
      }
    >
      <Undo />
    </CommonButton>
  );
}
