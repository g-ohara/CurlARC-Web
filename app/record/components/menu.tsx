"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Accordion } from "./accordion";
import { DatePicker } from "./datePicker";
import TeamDropdownMenu from "../../view/components/teamDropdownMenu";

type MenuProps = {
  putStone: boolean;
  setPutStone: Dispatch<SetStateAction<boolean>>;
  teams: { id: string; name: string }[];
  setTeamId: Dispatch<SetStateAction<string>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  place: string;
  setPlace: Dispatch<SetStateAction<string>>;
  isSubmitted: boolean;
  setShotSaved: Dispatch<SetStateAction<boolean>>;
};

export default function Menu({
  putStone,
  setPutStone,
  teams,
  setTeamId,
  date,
  setDate,
  place,
  setPlace,
  isSubmitted,
  setShotSaved,
}: MenuProps) {

  const [rotation, setRotation] = useState<boolean | null>(null);
  const [shotType, setShotType] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  return (
    <div className="grid">
      <form className="grid gap-4">
        <TeamDropdownMenu
          teams={teams}
          onSelect={(id: string) => setTeamId(id)}
        />
        <RotationMenu rotation={rotation} setRotation={setRotation} />
        <Accordion title="Advanced Options">
          <ShotTypeMenu shotType={shotType} setShotType={setShotType} />
          <ScoreMenu score={score} setScore={setScore} />
          <DifficultyMenu difficulty={difficulty} setDifficulty={setDifficulty} />
          <CommentField />
        </Accordion>
        <SaveButton
          putStone={putStone}
          rotation={rotation}
          setPutStone={setPutStone}
          setShotSaved={setShotSaved}
          resetMenus={() => {
            setRotation(null);
            setShotType(null);
            setScore(null);
            setDifficulty(null);
          }}
        />
        <Accordion title="Game Info">
          <Place place={place} setPlace={setPlace} />
          {/* <DatePicker date={date} setDate={setDate} /> */}
        </Accordion>
        <ShotHistory />
      </form>
    </div>
  );
}

function RotationMenu({ rotation, setRotation }: { rotation: boolean | null, setRotation: Dispatch<SetStateAction<boolean | null>> }) {
  return (
    <div>
      Rotation
      <ToggleButtonGroup
        value={rotation}
        exclusive
        color="primary"
        aria-label="Rotation"
        onChange={(_, newRotation: boolean) => setRotation(newRotation)}
        fullWidth
      >
        <ToggleButton value={false}>Clockwise</ToggleButton>
        <ToggleButton value={true}>CounterClockwise</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function ShotTypeMenu({ shotType, setShotType }: { shotType: string | null, setShotType: Dispatch<SetStateAction<string | null>> }) {
  return (
    <div>
      Shot Type
      <ToggleButtonGroup
        value={shotType}
        exclusive
        color="primary"
        onChange={(_, newShotType: string) => setShotType(newShotType)}
        fullWidth
      >
        <ToggleButton value="guard">Guards</ToggleButton>
        <ToggleButton value="draw">Draws</ToggleButton>
        <ToggleButton value="hit">Hits</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function ScoreMenu({ score, setScore }: { score: number | null, setScore: Dispatch<SetStateAction<number | null>> }) {
  return (
    <div>
      Score (%)
      <ToggleButtonGroup
        value={score}
        exclusive
        color="primary"
        onChange={(_, newScore: number) => setScore(newScore)}
        fullWidth
      >
        <ToggleButton value={0}>0</ToggleButton>
        <ToggleButton value={25}>25</ToggleButton>
        <ToggleButton value={50}>50</ToggleButton>
        <ToggleButton value={75}>75</ToggleButton>
        <ToggleButton value={100}>100</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function DifficultyMenu({ difficulty, setDifficulty }: { difficulty: string | null, setDifficulty: Dispatch<SetStateAction<string | null>> }) {
  return (
    <div>
      Difficulty
      <ToggleButtonGroup
        value={difficulty}
        exclusive
        color="primary"
        onChange={(_, newDifficulty: string) => setDifficulty(newDifficulty)}
        fullWidth
      >
        <ToggleButton value="easy">Easy</ToggleButton>
        <ToggleButton value="normal">Normal</ToggleButton>
        <ToggleButton value="hard">Hard</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function CommentField() {
  return (
    <div>
      <p>Comments</p>
      <TextField multiline rows={4} className="w-full" />
    </div>
  );
}

function Place({ place, setPlace }: { place: string, setPlace: Dispatch<SetStateAction<string>> }) {
  return (
    <Input
      id="place"
      value={place}
      onChange={(e) => setPlace(e.target.value)}
      placeholder="Place"
      className="w-full"
      required
    />
  );
}

function SaveButton({
  putStone,
  rotation,
  setPutStone,
  setShotSaved,
  resetMenus,
}: {
  putStone: boolean;
  rotation: boolean | null;
  setPutStone: Dispatch<SetStateAction<boolean>>;
  setShotSaved: Dispatch<SetStateAction<boolean>>;
  resetMenus: () => void;
}) {
  const saveShot = () => {
    setShotSaved(true);
    resetMenus();
    setPutStone(false);
    setTimeout(() => setShotSaved(false), 1000);
  };

  return (
    <Button onClick={saveShot} disabled={!putStone || rotation === null}>
      Save Shot
    </Button>
  );
}

function ShotHistory() {
  return (
    <div>
      <Accordion title="Shot History">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shot No.</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Player 1</TableCell>
              <TableCell>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost">
                    <EditIcon />
                  </Button>
                  <Button variant="ghost">
                    <DeleteIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Accordion>
    </div>
  );
}
