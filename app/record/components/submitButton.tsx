import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createRecord } from '@/lib/api/record';
import { createRecordRequest } from '@/types/request';

type SubmitButtonProps = {
  teamId: string;
  place: string;
  date: Date | undefined;
  ends_data: any[]; // Use the correct type here
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({ teamId, place, date, ends_data }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function submitGame() {
    setIsSubmitted(true);

    const req: createRecordRequest = {
      place,
      date: date || new Date(),
      ends_data,
    };

    await createRecord(teamId, req); // チームを作成

    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
    }, 1000);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
      <DialogTrigger asChild>
        <Button>Submit Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Game</DialogTitle>
          <DialogDescription>Are you sure you want to submit this game?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="ml-auto"
            onClick={submitGame}
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
