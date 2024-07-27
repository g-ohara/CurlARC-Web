"use client"

import { useState, useEffect, useRef } from "react"
import { drawSheet } from "./sheet"
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"

let count = 0;
let putStone = false;
let hammer = false;

export default function Component() {

  const [score, setScore] = useState<number>(0);
  const [rotation, setRotation] = useState<boolean>(false);

  const handleRotation = (
    _: React.MouseEvent<HTMLElement>,
    newRotation: boolean,
  ) => {
    setRotation(newRotation);
  };

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newScore: number,
  ) => {
    setScore(newScore);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const x = 10;
  const y = 10;
  const ratio = 0.9;
  let stones: [number, number][] = [];

  const redraw = () => {
    drawSheet(canvasRef, x, y, ratio, stones, hammer);
  };

  const handleClick = (event: MouseEvent) => {
    if (canvasRef.current?.contains(event.target as Node) && count < 16) {
      const click_x = event.clientX - canvasRef.current.offsetLeft;
      const click_y = event.clientY - canvasRef.current.offsetTop;
      putStone = true;
      if (stones.length <= count) {
        stones.push([click_x, click_y]);
      }
      else {
        stones[count] = [click_x, click_y];
      }
      redraw();
    }
  };

  function saveShot() {
    console.log(putStone);
    if (putStone) {
      ++count;
      setScore(0);
      setRotation(true);
      putStone = false;
    }
  }

  useEffect(() => {
    redraw();
    document.addEventListener('click', handleClick);

    // Cleanup function to remove event listener when component unmounts
    return () => { document.removeEventListener('click', handleClick); };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <canvas id="sheet" ref={canvasRef} width="500" height="1000" />
        <div className="grid gap-4">
          <div className="bg-muted rounded-lg overflow-hidden">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <div>
                  Rotation
                  <ToggleButtonGroup
                    value={rotation}
                    exclusive
                    color="primary"
                    aria-label="Rotation"
                    onChange={handleRotation}
                    fullWidth
                    className="bg-slate-100"
                  >
                    <ToggleButton value="true">Clockwise</ToggleButton>
                    <ToggleButton value="false">Counter Clockwise</ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <div>
                <Accordion className="bg-slate-100">
                  <AccordionSummary>
                    Advanced Options
                  </AccordionSummary>
                  <AccordionDetails className="grid gap-5">
                    <div>
                      Score (%)
                      <ToggleButtonGroup
                        value={score}
                        exclusive
                        color="primary"
                        aria-label="Score"
                        onChange={handleChange}
                        fullWidth
                      >
                        <ToggleButton value="0">0</ToggleButton>
                        <ToggleButton value="25">25</ToggleButton>
                        <ToggleButton value="50">50</ToggleButton>
                        <ToggleButton value="75">75</ToggleButton>
                        <ToggleButton value="100">100</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <TextField multiline rows={4} label="Comment" />
                  </AccordionDetails>
                </Accordion>
              </div>
              <div>
                <Button variant="contained" onClick={() => { saveShot(); }}>
                  Save Shot
                </Button>
              </div>
              <div>
                <Accordion className="bg-slate-100">
                  <AccordionSummary>Shot History</AccordionSummary>
                  <AccordionDetails>
                    (Work in Progress)
                  </AccordionDetails>
                </Accordion>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}
