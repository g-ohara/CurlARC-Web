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
  const [score, setScore] = useState<number>(0);
  const [rotation, setRotation] = useState<boolean>(false);

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

    function CommentField() {
      return <div><TextField multiline rows={4} label="Comment" /></div>;
    }

    return (
      <Accordion title="Advanced Options">
        <ScoreMenu />
        <CommentField />
      </Accordion>
    );
  }

  function SaveButton() {

    // Save the position, score, and rotation of the shot
    function saveShot() {
      sheetSaveShot();
      setScore(0);
      setRotation(true);
    }

    return (
      <Button variant="contained" onClick={() => { saveShot(); }}>
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
