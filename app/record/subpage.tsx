"use client";

import { useState, useEffect } from 'react'

import RecordSheet from './sheet'
import Menu from './menu'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { createRecord } from '@/lib/api/record'
import { DataPerEnd, RecordDetail } from '../@types/model';
import { createRecordRequest } from '../@types/request';

type SubpageProps = {
  teams: {
    id: string
    name: string
  }[]
}

export default function Subpage(props: SubpageProps) {

  const [teamId, setTeamId] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [place, setPlace] = useState('')

  const [ends_data, setEndsData] = useState<DataPerEnd[]>([])

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [shotSaved, setShotSaved] = useState(false)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [putStone, setPutStone] = useState(false)

  const resize = () => {
    setWidth(window.innerWidth / 3)
    setHeight(window.innerHeight - 200)
  }

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
  }, [])

  function SubmitButton() {

    const [isOpen, setIsOpen] = useState(false);

    // Save the position, score, and rotation of the shot
    async function submitGame() {
      setIsSubmitted(true);

      const req: createRecordRequest = {
        place: place,
        date: date ? date : new Date(),
        ends_data: ends_data
      }

      await createRecord(props.teams[0].id, req) // チームを作成

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
            <Button type="button" variant="ghost" onClick={() => { setIsOpen(false); }}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-auto"
              // disabled={isSubmitted}
              onClick={() => { submitGame(); }}
            >
              {isSubmitted ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog >
    );
  }

  return (
    <div className="z-0 grid w-full p-7 md:grid-cols-2">
      <RecordSheet
        width={width}
        height={height}
        putStone={putStone}
        setPutStone={setPutStone}
        setEndsData={setEndsData}
        isSubmitted={isSubmitted}
        shotSaved={shotSaved}
      />
      <div className="z-0 grid w-full p-7">
        <Menu
          putStone={putStone}
          setPutStone={setPutStone}
          teams={props.teams}
          setTeamId={setTeamId}
          setDate={setDate}
          setPlace={setPlace}
          isSubmitted={isSubmitted}
          setShotSaved={setShotSaved}
        />
        <SubmitButton />
        {teamId}
        {place}
      </div>
    </div>
  )
}
