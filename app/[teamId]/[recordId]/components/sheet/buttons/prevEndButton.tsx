import CommonButton from './commonButton';
import { ChevronsLeft } from 'lucide-react';

type Props = {
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function PrevShotButton({
  selectedEndIndex,
  setSelectedEndIndex,
  setSelectedShotIndex,
}: Props) {

  const selectPrevEnd = () => {
    setSelectedShotIndex(0);
    setSelectedEndIndex(selectedEndIndex - 1);
  };

  return (
    <CommonButton
      onClick={selectPrevEnd}
      disabled={selectedEndIndex === 0}
    >
      <ChevronsLeft />
    </CommonButton>
  );
}
