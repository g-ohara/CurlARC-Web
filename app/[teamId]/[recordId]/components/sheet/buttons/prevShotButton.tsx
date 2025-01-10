import CommonButton from './commonButton';
import { ChevronLeft } from 'lucide-react';

type Props = {
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function PrevShotButton({
  selectedShotIndex,
  setSelectedShotIndex,
}: Props) {

  const prevShot = () => {
    setSelectedShotIndex(selectedShotIndex - 1);
  };

  return (
    <CommonButton
      onClick={prevShot}
      disabled={selectedShotIndex === 0}
    >
      <ChevronLeft />
    </CommonButton>
  );
}
