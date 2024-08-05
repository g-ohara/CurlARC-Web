'use client'

import { CalendarIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function View() {
  return (
  <main className="flex-1 p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/placeholder.svg"
              width={40}
              height={40}
              alt="Team Logo"
              className="rounded-full"
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
            <div>
              <h3 className="text-lg font-medium">Team Frosty</h3>
              <p className="text-sm text-muted-foreground">Last game: 2023-04-15</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">8</div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium">10</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Team Frosty had a close game against their rivals, Team Icicle. The final score was 8-10 in favor of
          Team Icicle.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-1 inline" /> April 15, 2023
          </div>
          <Button variant="outline" size="sm">
            View Record
          </Button>
        </div>
      </CardFooter>
    </Card>
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/placeholder.svg"
              width={40}
              height={40}
              alt="Team Logo"
              className="rounded-full"
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
            <div>
              <h3 className="text-lg font-medium">Team Glacier</h3>
              <p className="text-sm text-muted-foreground">Last game: 2023-04-10</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">12</div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium">8</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Team Glacier had a decisive victory over Team Snowflake, winning 12-8 in a hard-fought match.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-1 inline" /> April 10, 2023
          </div>
          <Button variant="outline" size="sm">
            View Record
          </Button>
        </div>
      </CardFooter>
    </Card>
    <Card className="bg-white rounded-lg shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/placeholder.svg"
              width={40}
              height={40}
              alt="Team Logo"
              className="rounded-full"
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
            <div>
              <h3 className="text-lg font-medium">Team Blizzard</h3>
              <p className="text-sm text-muted-foreground">Last game: 2023-04-05</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">6</div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium">14</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Team Blizzard suffered a tough loss against the formidable Team Avalanche, with a final score of 6-14.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <CalendarIcon className="w-4 h-4 mr-1 inline" /> April 5, 2023
          </div>
          <Button variant="outline" size="sm">
            View Record
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</main>
  )
}
