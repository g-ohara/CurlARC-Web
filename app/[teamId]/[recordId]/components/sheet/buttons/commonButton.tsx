import { Button } from '@/components/ui/button';

type Props = {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
};

export default function CommonButton({
  onClick,
  disabled,
  children,
}: Props) {

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="flex-1"
    >
      {children}
    </Button>
  );
}
