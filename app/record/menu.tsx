"use client";

import { useState } from "react"
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { Accordion } from "./components";
import { saveShot as sheetSaveShot } from "./sheet";

export default function Menu() {

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

  function AdvancedOptions() {

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

    return (
      <Accordion title="Advanced Options">
        <ShotTypeMenu />
        <ScoreMenu />
        <DifficultyMenu />
        <CommentField />
      </Accordion>
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
    }

    return (
      <Button
        variant="contained"
        onClick={() => { saveShot(); }}
        disabled={rotation === null}
      >
        Save Shot
      </Button>
    );
  }

  function History() {
    return (
      <div>
        <Accordion title="Shot History">
          (Work in Progress)
        </Accordion>
      </div>
    );
  }

  return (
    <div className="grid">
      <div>
        <form className="grid gap-4">
          <RotationMenu />
          <AdvancedOptions />
          <SaveButton />
        </form>
      </div>
      <History />
    </div>
  )
}
