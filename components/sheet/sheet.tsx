import React, { useEffect, useRef, useState } from "react";
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions, useParentSize } from "./utils";
import { Button } from "../ui/button";
import { initializeCurlingSheet } from "./curlingSheetInitializer";

const INITIAL_STONE_POSITION = {
  r: SHEET_CONSTANTS.HOUSE_RADIUS * 1.5,
  theta: -Math.PI/2,
};

export function Sheet({ 
  friendStones = [],
  enemyStones = [],
  friendIsRed,
  className,
  interactive = false,
  onStonePositionChange,
  selectedEndIndex,
  selectedShotIndex,
}: SheetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, parentSize } = useParentSize();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  const [curlingSheet, setCurlingSheet] = useState<ReturnType<typeof initializeCurlingSheet> | null>(null);

  const handleStoneMove = (isFriendStone: boolean, index: number, r: number, theta: number) => {
    if (!interactive || !onStonePositionChange) return;
    onStonePositionChange(selectedEndIndex, selectedShotIndex, isFriendStone, { r, theta, index });
  };

  const addStone = (isFriendStone: boolean) => {
    if (!interactive || !onStonePositionChange) return;
    
    const stones = isFriendStone ? friendStones : enemyStones;
    if (stones.length >= 8) return;

    const newStone: Coordinate = {
      index: stones.length,
      ...INITIAL_STONE_POSITION,
    };
    onStonePositionChange(selectedEndIndex, selectedShotIndex, isFriendStone, newStone);
  };
  
  useEffect(() => {
    setDimensions(calculateDimensions(parentSize));
  }, [parentSize]);

  useEffect(() => {
    if (canvasRef.current) {
      const sheet = initializeCurlingSheet(canvasRef.current.id, dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH);
      setCurlingSheet(sheet);
      if (curlingSheet) {
        curlingSheet.onStoneMove = handleStoneMove
      }
    }
  }, [dimensions]);

  useEffect(() => {
    if (curlingSheet) {
      curlingSheet.clearStones();
      friendStones.forEach((stone, index) => {
        curlingSheet.addStone(stone.r, stone.theta, friendIsRed, true);
      });
      enemyStones.forEach((stone, index) => {
        curlingSheet.addStone(stone.r, stone.theta, !friendIsRed, false);
      });
      curlingSheet.draw();
      console.log("corrdinates", curlingSheet.getStoneCoordinates());
    }
  }, [curlingSheet, friendStones, enemyStones, friendIsRed]);

  return (
    <div className={className} ref={containerRef}>
      {interactive && (
        <>
          <div className="flex gap-2 mb-2">
            <Button 
              onClick={() => addStone(true)}
              disabled={friendStones?.length >= 8}
            >
              Add Friend Stone
            </Button>
            <Button 
              onClick={() => addStone(false)}
              disabled={enemyStones?.length >= 8}
            >
              Add Enemy Stone
            </Button>
          </div>
          <div className="mb-2">
            <span className="mr-4">Friend Stones: {friendStones?.length}/8</span>
            <span>Enemy Stones: {enemyStones?.length}/8</span>
          </div>
        </>
      )}
      <canvas
        id="curlingCanvas"
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  );
}