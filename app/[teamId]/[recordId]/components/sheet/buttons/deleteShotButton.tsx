import CommonButton from './commonButton';
import { RecordDetail } from '@/types/model';
import { Delete } from 'lucide-react';

type Props = {
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function DeleteShotButton({
  record,
  setRecord,
  selectedEndIndex,
  setSelectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
}: Props) {

  // Called when "Delete Shot" button is clicked.
  // If the first shot is selected,
  // remove current end then select the previous end.
  // Otherwise, remove current shot then select the previous shot.
  const deleteShot = () => {
    if (selectedShotIndex === 0) {
      setRecord(prevRecord => {
        return {
          ...prevRecord,
          ends_data: prevRecord.ends_data.slice(0, selectedEndIndex),
        };
      })
      setSelectedEndIndex(selectedEndIndex - 1);
      setSelectedShotIndex(15);
    }
    else {
      setRecord(prevRecord => {
        return {
          ...prevRecord,
          ends_data: [
            ...prevRecord.ends_data.slice(0, selectedEndIndex),
            {
              ...prevRecord.ends_data[selectedEndIndex],
              shots: prevRecord.ends_data[selectedEndIndex].shots.slice(0, selectedShotIndex),
            },
          ],
        };
      })
      setSelectedShotIndex(selectedShotIndex - 1);
    }
  }

  const endsNum = record.ends_data.length;
  const shotsNum = record.ends_data[record.ends_data.length - 1].shots.length;

  return (
    <CommonButton
      onClick={deleteShot}
      disabled={
        selectedEndIndex < endsNum - 1 || selectedShotIndex < shotsNum - 1 ||
        selectedEndIndex === 0 && selectedShotIndex === 0
      }
      hoverText="Delete Shot"
    >
      <Delete />
    </CommonButton>
  );
}
