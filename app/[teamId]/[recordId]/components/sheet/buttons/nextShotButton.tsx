import CommonButton from './commonButton';
import { ChevronRight } from 'lucide-react';

type Props = {
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  shotsNum: number
};

export default function NextShotButton({
  selectedShotIndex,
  setSelectedShotIndex,
  shotsNum,
}: Props) {

  const nextShot = () => {
    setSelectedShotIndex(selectedShotIndex + 1);
  };

  return (
    <CommonButton
      onClick={nextShot}
      disabled={selectedShotIndex >= shotsNum - 1}
    >
      <ChevronRight />
    </CommonButton>
  );
}
