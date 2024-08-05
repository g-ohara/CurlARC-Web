"use client";

import { Dispatch, SetStateAction, useState } from "react"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Accordion } from "./components";
import { saveShot as sheetSaveShot } from "./sheet";

export default function Menu(props: Readonly<{ putStone: boolean, setPutStone: Dispatch<SetStateAction<boolean>> }>) {

  // Parameters for each shot
  const [rotation, setRotation] = useState<boolean | null>(null);

  // Optional parameters for each shot
  const [shotType, setShotType] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  function RotationMenu() {
    return (
      <div>
        Rotation
        <ToggleButtonGroup
          value={rotation}
          exclusive
          color="primary"
          aria-label="Rotation"
          onChange={(_: React.MouseEvent<HTMLElement>, newRotation: boolean) => {
            setRotation(newRotation);
          }}
          fullWidth
          className="bg-slate-100"
        >
          <ToggleButton value="false">Clockwise</ToggleButton>
          <ToggleButton value="true">CounterClockwise</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  function ShotTypeMenu() {
    return (
      <div>
        Shot Type
        <ToggleButtonGroup
          value={shotType}
          exclusive
          color="primary"
          aria-label="Shot Type"
          fullWidth
          className="bg-slate-100"
          onChange={(_: React.MouseEvent<HTMLElement>, newShotType: string) => {
            setShotType(newShotType);
            console.log(shotType);
          }}
        >
          <ToggleButton value="guard">Guards</ToggleButton>
          <ToggleButton value="draw">Draws</ToggleButton>
          <ToggleButton value="hit">Hits</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  function ScoreMenu() {
    return (
      <div>
        Score (%)
        <ToggleButtonGroup
          value={score}
          exclusive
          color="primary"
          aria-label="Score"
          onChange={(_: React.MouseEvent<HTMLElement>, newScore: number) => {
            setScore(newScore);
          }}
          fullWidth
        >
          <ToggleButton value="0">0</ToggleButton>
          <ToggleButton value="25">25</ToggleButton>
          <ToggleButton value="50">50</ToggleButton>
          <ToggleButton value="75">75</ToggleButton>
          <ToggleButton value="100">100</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  function DifficultyMenu() {
    return (
      <div>
        Difficulty
        <ToggleButtonGroup
          value={difficulty}
          exclusive
          color="primary"
          aria-label="Difficulty"
          fullWidth
          className="bg-slate-100"
          onChange={(_: React.MouseEvent<HTMLElement>, newDifficulty: string) => {
            setDifficulty(newDifficulty);
          }}
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

  function SaveButton() {

    // Save the position, score, and rotation of the shot
    function saveShot() {
      sheetSaveShot();
      setRotation(null);
      setShotType(null);
      setScore(null);
      setDifficulty(null);
      props.setPutStone(false);
    }

    return (
      <Button
        variant="contained"
        onClick={() => { saveShot(); }}
        disabled={!props.putStone || rotation === null}
      >
        Save Shot
      </Button>
    );
  }

  function History() {
    return (
      <div>
        <Accordion title="Shot History">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Shot No.</TableCell>
                <TableCell>Player</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Player 1</TableCell>
                <TableCell>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outlined"><EditIcon /></Button>
                    <Button variant="outlined"><DeleteIcon /></Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Accordion>
      </div>
    );
  }

  return (
    <div className="grid">
      <div>
        <form className="grid gap-4">
          <RotationMenu />
          <Accordion title="Advanced Options">
            <ShotTypeMenu />
            <ScoreMenu />
            <DifficultyMenu />
            <CommentField />
          </Accordion>
          <SaveButton />
        </form>
      </div>
      <History />
    </div>
  )
}
