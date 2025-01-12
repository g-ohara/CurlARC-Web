import CommonButton from './commonButton';
import { Save } from 'lucide-react';

type Props = {
  handleSave: () => void;
};

export default function NextShotButton({
  handleSave,
}: Props) {

  return (
    <CommonButton
      onClick={handleSave}
      hoverText="Save Record"
    >
      <Save />
    </CommonButton>
  );
}
