import { Button } from '@/components/ui/button';
import { RecordDetail, Shot } from '@/types/model';
import { Coordinate } from "../types";
import { SHEET_CONSTANTS } from "../constants";

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  onStonePositionChange: (endIndex: number, shotIndex: number, isFriendStone: boolean, newStone: Coordinate) => void
};

export default function NextShotButton({
  record,
  setRecord,
  selectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
  onStonePositionChange,
}: Props) {

  // Add a new stone at the initial position.
  const addStone = () => {

    const selectedEnd = record.ends_data[selectedEndIndex];
    const selectedShot = selectedEnd.shots[selectedShotIndex];
    const friendStones = selectedShot.stones.friend_stones;
    const enemyStones = selectedShot.stones.enemy_stones;

    // TODO: Implement logic to get which team is first in current end.
    const isFirstInThisEnd = record.is_first;
    const isFirstTurn = selectedShotIndex % 2 === 1;
    const isFriendTurn = isFirstInThisEnd ? isFirstTurn : !isFirstTurn;

    const stones = isFriendTurn ? friendStones : enemyStones;
    const newStone: Coordinate = {
      index: stones.length,
      ...SHEET_CONSTANTS.INITIAL_STONE_POSITION,
    };
    onStonePositionChange(
      selectedEndIndex,
      selectedShotIndex + 1,
      isFriendTurn,
      newStone,
    );
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
      id: record.id,
      team_id: record.team_id,
      result: record.result,
      enemy_team_name: record.enemy_team_name,
      place: record.place,
      date: record.date,
      ends_data: [...endsData.slice(0, endsData.length - 1), newDataPerEnd],
      is_first: record.is_first,
      is_public: record.is_public,
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
      setRecord(prevRecord => {
        const prevShots = prevRecord.ends_data?.[selectedEndIndex]?.shots ?? [];
        const newShot: Shot = {
          type: '',
          success_rate: 0,
          shooter: '',
          stones: { ...prevShots[prevShots.length - 1].stones }
        }
        return appendNewShot(prevRecord, newShot);
      })
      setSelectedShotIndex(selectedShotIndex + 1);

      addStone();
    }
    setSelectedShotIndex(selectedShotIndex + 1);
  };

  return (
    <Button onClick={nextShot} disabled={selectedShotIndex >= 16}>
      Next Shot
    </Button>
  );
}
