import { Button } from '@/components/ui/button';
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
    <Button
      variant="outline"
      onClick={selectPrevEnd}
      disabled={selectedEndIndex === 0}
    >
      <ChevronsLeft />
    </Button>
  );
}
