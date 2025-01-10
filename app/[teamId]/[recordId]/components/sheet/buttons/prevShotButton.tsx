import CommonButton from './commonButton';
import { ChevronLeft } from 'lucide-react';

type Props = {
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function PrevShotButton({
  selectedEndIndex,
  setSelectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
}: Props) {

  const prevShot = () => {
    if (selectedShotIndex === 0) {
      setSelectedShotIndex(15);
      setSelectedEndIndex(selectedEndIndex - 1);
    }
    else {
      setSelectedShotIndex(selectedShotIndex - 1);
    }
  };

  return (
    <CommonButton
      onClick={prevShot}
      disabled={selectedShotIndex === 0 && selectedEndIndex === 0}
    >
      <ChevronLeft />
    </CommonButton>
  );
}
