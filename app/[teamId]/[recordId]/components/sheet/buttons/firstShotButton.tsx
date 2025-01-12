import CommonButton from './commonButton';
import { ChevronFirst } from 'lucide-react';

type Props = {
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function FirstShotButton({
  selectedShotIndex,
  setSelectedShotIndex,
}: Props) {

  const selectFirstShot = () => {
    setSelectedShotIndex(0);
  };

  return (
    <CommonButton
      onClick={selectFirstShot}
      disabled={selectedShotIndex === 0}
      hoverText="First Shot on This End"
    >
      <ChevronFirst />
    </CommonButton>
  );
}
