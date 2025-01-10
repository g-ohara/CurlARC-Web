import { Button } from '@/components/ui/button';
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
    <Button
      variant="outline"
      onClick={selectFirstShot}
      disabled={selectedShotIndex === 0}
    >
      <ChevronFirst />
    </Button>
  );
}
