import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  onClick: () => void
  disabled?: boolean
  hoverText?: string
  children: React.ReactNode
};

export default function CommonButton({
  onClick,
  disabled,
  hoverText,
  children,
}: Props) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={onClick}
            disabled={disabled}
            className="flex-1 w-0"
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hoverText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
