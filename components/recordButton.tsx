import { PlusIcon } from './icons'
import { Button } from './ui/button'

export default function RecordButton() {
  return (
    <Button
      size="lg"
      className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary fixed bottom-6 right-6 shadow-lg"
    >
      <PlusIcon className="h-6 w-6" />
      <span className="sr-only">Create Record</span>
    </Button>
  )
}
