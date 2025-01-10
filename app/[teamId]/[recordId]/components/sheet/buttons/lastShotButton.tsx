import { Button } from '@/components/ui/button';
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
    <Button
      variant="outline"
      onClick={selectLastShot}
      disabled={selectedShotIndex >= shotsNum - 1}
    >
      <ChevronLast />
    </Button>
  );
}
