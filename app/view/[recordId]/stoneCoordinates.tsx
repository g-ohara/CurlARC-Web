import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function StoneCoordinates() {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Stone Coordinates</h2>
      <form className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-1 flex-col space-y-2">
            <Label htmlFor="end" className="text-sm font-medium">
              End
            </Label>
            <Input
              id="end"
              placeholder="Enter end"
              className="border-muted bg-muted text-foreground focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <Label htmlFor="shot" className="text-sm font-medium">
              Shot Number
            </Label>
            <Input
              id="shot"
              placeholder="Enter shot number"
              className="border-muted bg-muted text-foreground focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary">
          Show Coordinates
        </Button>
      </form>
    </div>
  )
}
