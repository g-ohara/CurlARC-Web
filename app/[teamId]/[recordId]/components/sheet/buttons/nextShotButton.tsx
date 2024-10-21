import { Button } from '@/components/ui/button';
import { RecordDetail, Shot } from '@/types/model';

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function NextShotButton({
  record,
  setRecord,
  selectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
}: Props) {

  // Called when "Next Shot" button is clicked
  const createNextShot = () => {
    const prevShots = record.ends_data[selectedEndIndex].shots;
    if (prevShots.length < 16) {
      if (selectedShotIndex === prevShots.length - 1) {
        console.log("last shot")
        setRecord(prevRecord => {
          const prevShots = prevRecord.ends_data?.[selectedEndIndex]?.shots ?? [];
          // A new shot has the same stone positions as the previous shot.
          const newShot: Shot = {
            type: '',
            success_rate: 0,
            shooter: '',
            stones: prevShots[prevShots.length - 1].stones,
          }
          const newShots = [...prevShots, newShot];
          const newDataPerEnd = {
            score: prevRecord.ends_data[selectedEndIndex].score,
            shots: newShots
          };
          const newEndsData = [
            ...prevRecord.ends_data.slice(0, selectedEndIndex), newDataPerEnd
          ];
          const newRecord = {
            id: prevRecord.id,
            team_id: prevRecord.team_id,
            result: prevRecord.result,
            enemy_team_name: prevRecord.enemy_team_name,
            place: prevRecord.place,
            date: prevRecord.date,
            ends_data: newEndsData,
            is_public: prevRecord.is_public,
          };
          return newRecord;
        })
      }
      setSelectedShotIndex(selectedShotIndex + 1);
    }
  };

  return (
    <Button onClick={createNextShot} disabled={selectedShotIndex >= 16}>
      Next Shot
    </Button>
  );
}
