import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';

type Props = {
  selectedEndIndex: number;
  setSelectedEndIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
  endsNum: number;
};

export default function PrevShotButton({
  selectedEndIndex,
  setSelectedEndIndex,
  setSelectedShotIndex,
  endsNum,
}: Props) {

  const selectNextEnd = () => {
    setSelectedShotIndex(0);
    setSelectedEndIndex(selectedEndIndex + 1);
  };

  return (
    <Button
      variant="outline"
      onClick={selectNextEnd}
      disabled={selectedEndIndex >= endsNum - 1}
    >
      <ChevronsRight />
    </Button>
  );
}
