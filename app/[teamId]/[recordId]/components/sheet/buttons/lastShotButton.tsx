import CommonButton from './commonButton';
import { ChevronLast } from 'lucide-react';

type Props = {
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  shotsNum: number;
};

export default function FirstShotButton({
  selectedShotIndex,
  setSelectedShotIndex,
  shotsNum,
}: Props) {

  const selectLastShot = () => {
    setSelectedShotIndex(shotsNum - 1);
  };

  return (
    <CommonButton
      onClick={selectLastShot}
      disabled={selectedShotIndex >= shotsNum - 1}
      hoverText="Last Shot on This End"
    >
      <ChevronLast />
    </CommonButton>
  );
}
