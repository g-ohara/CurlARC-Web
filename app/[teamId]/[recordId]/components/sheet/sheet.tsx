import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions, useParentSize, polarToCartesian, drawSheet, cartesianToPolar } from "./utils";
import { Stones } from "@/types/model";

interface StoneProps {
  id: string;
  index: number;
  r: number;
  theta: number;
  isRed: boolean;
  scale: number;
  draggable: boolean;
}

// Check whether stone is out of the sheet.
export const stoneIsOut = (r: number, theta: number): boolean => {
  const { x, y } = polarToCartesian(r, theta);

  // If borderOffset is set to 0,
  // stones on left and top are not recognized as out of the sheet.
  const borderOffset = 0.0001 * SHEET_CONSTANTS.SHEET_WIDTH;

  const xOut = x - SHEET_CONSTANTS.STONE_RADIUS <= borderOffset ||
    x + SHEET_CONSTANTS.STONE_RADIUS >= SHEET_CONSTANTS.SHEET_WIDTH;
  const yOut = y - SHEET_CONSTANTS.STONE_RADIUS <= borderOffset ||
    y + SHEET_CONSTANTS.STONE_RADIUS >= SHEET_CONSTANTS.SHEET_HEIGHT + SHEET_CONSTANTS.STONE_RADIUS * 2;
  return xOut || yOut;
};


function DraggableStone(
  { id, index, r, theta, isRed, scale, draggable }: StoneProps
) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    disabled: !draggable,
  });

  const { x, y } = polarToCartesian(r, theta);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const stoneColor = isRed ? 'red' : 'yellow';
  const outStoneColor = isRed ? '#800000' : '#808000';
  const backgroundColor = stoneIsOut(r, theta) ? outStoneColor : stoneColor;
  const border = stoneIsOut(r, theta) ? '4px solid #404040' : '4px solid grey';

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        left: x * scale - SHEET_CONSTANTS.STONE_RADIUS * scale,
        top: y * scale - SHEET_CONSTANTS.STONE_RADIUS * scale,
        width: SHEET_CONSTANTS.STONE_RADIUS * 2 * scale,
        height: SHEET_CONSTANTS.STONE_RADIUS * 2 * scale,
        borderRadius: '50%',
        backgroundColor: backgroundColor,
        border: border,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: draggable ? 'grab' : 'default',
        fontSize: 16 * scale,
        touchAction: 'none',
        transform: `scale(${isDragging ? 1.2 : 1})`,
        transition: isDragging ? "transform 0.1s ease" : "transorm 0.3s ease",
        ...style,
      }}
      {...listeners}
      {...attributes}
    >
      {index + 1}
    </div>
  );
}

export function Sheet({
  className,
  interactive = false,
  record,
  setRecord,
  selectedEndIndex,
  setSelectedEndIndex,
  selectedShotIndex,
  setSelectedShotIndex,
}: SheetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, parentSize } = useParentSize();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });

  const scale = dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH;

  const selectedEnd = record.ends_data[selectedEndIndex];
  const selectedShot = selectedEnd ? selectedEnd.shots[selectedShotIndex] || { stones: { friend_stones: [], enemy_stones: [] } } : { stones: { friend_stones: [], enemy_stones: [] } };
  const friendStones = selectedShot.stones.friend_stones;
  const enemyStones = selectedShot.stones.enemy_stones;

  // TODO: Get whether friend color from record
  const friendIsRed = true;

  const calcScore = (stones: Stones) => {
    const friendStones = [...stones.friend_stones].sort((a, b) => a.r - b.r);
    const enemyStones = [...stones.enemy_stones].sort((a, b) => a.r - b.r);

    // A threshold to filter out out-of-the-house stones
    const maxR = SHEET_CONSTANTS.HOUSE_RADIUS + SHEET_CONSTANTS.STONE_RADIUS;

    // ex. myMin(1, 2) = 1
    //     myMin(1, undefined) = 1
    //     myMin(undefined, 2) = 2
    //     myMin(undefined, undefined) = undefined
    const myMin = (a: number, b: number) => a ? b ? Math.min(a, b) : a : b;

    // Count the number of my stones closer than the first opponent stone
    const calcMyScore = (
      myStones: Coordinate[],
      firstOpponentStoneR: number
    ) => {
      return myStones.filter(stone => stone.r < firstOpponentStoneR).length;
    }

    const firstEnemyStoneR = myMin(maxR, enemyStones[0]?.r);
    const firstFriendStoneR = myMin(maxR, friendStones[0]?.r);
    const friendScore = calcMyScore(friendStones, firstEnemyStoneR);
    const enemyScore = calcMyScore(enemyStones, firstFriendStoneR);
    return friendScore - enemyScore;
  };

  const onStonePositionChange = (
    endIndex: number,
    shotIndex: number,
    isFriendStone: boolean,
    newPosition: Coordinate
  ) => {
    setRecord(prevRecord => {
      const newEndsData = [...prevRecord.ends_data];
      const targetShot = newEndsData[endIndex].shots[shotIndex];
      const stoneKey = isFriendStone ? 'friend_stones' : 'enemy_stones';
      const oldStones = [...targetShot.stones[stoneKey]];
      const stoneExists = oldStones.some(stone => stone.index === newPosition.index);

      let newStones;

      // Add or move a stone.
      if (stoneExists) { // 既に存在する石の場合
        newStones = oldStones.map((stone) => {
          if (stone.index === newPosition.index) {
            return newPosition;
          } else {
            return stone;
          }
        }
        );
      } else {
        newStones = [...oldStones, newPosition];
      }

      // Update stones in current shot
      targetShot.stones[stoneKey] = newStones;

      // Update score in current end
      newEndsData[endIndex].score = calcScore(targetShot.stones);

      // Update result in current record
      const totalScore = newEndsData.reduce((acc, cur) => acc + cur.score, 0);
      const result = totalScore > 0 ? 'WIN' : totalScore < 0 ? 'LOSE' : 'DRAW';
      console.log(result);

      return {
        ...prevRecord,
        ends_data: newEndsData,
        result: result,
      };
    });
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    // スクロールを有効化
    document.body.style.overflow = 'auto';
    if (!interactive || !onStonePositionChange) return;
    const { active, delta } = event;

    const id = active.id as string;
    const isFriendStone = id.startsWith('friend');
    const index = parseInt(id.split('-')[1]);

    const stones = isFriendStone ? friendStones : enemyStones;
    const stone = stones.find(stone => stone.index === index);

    if (!stone) return;

    const { x: oldX, y: oldY } = polarToCartesian(stone.r, stone.theta);

    const newX = oldX + delta.x / scale;
    const newY = oldY + delta.y / scale;

    const { r, theta } = cartesianToPolar(newX, newY);
    onStonePositionChange(selectedEndIndex, selectedShotIndex, isFriendStone, { r, theta, index });
  }, [interactive, onStonePositionChange, selectedEndIndex, selectedShotIndex, scale, friendStones, enemyStones]);

  useEffect(() => {
    setDimensions(calculateDimensions(parentSize));
  }, [parentSize]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawSheet(ctx, dimensions.width, dimensions.height);
      }
    }
  }, [dimensions]);

  const { setNodeRef } = useDroppable({
    id: 'sheet',
  });

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div className={className} ref={containerRef}>
        <div
          ref={setNodeRef}
          style={{ position: 'relative', width: dimensions.width, height: dimensions.height }}
        >
          <canvas
            id="curlingCanvas"
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
          />
          {friendStones.map((stone) => (
            <DraggableStone
              key={`friend-${stone.index}`}
              id={`friend-${stone.index}`}
              index={stone.index}
              r={stone.r}
              theta={stone.theta}
              isRed={friendIsRed}
              scale={scale}
              draggable={interactive}
            />
          ))}
          {enemyStones.map((stone) => (
            <DraggableStone
              key={`enemy-${stone.index}`}
              id={`enemy-${stone.index}`}
              index={stone.index}
              r={stone.r}
              theta={stone.theta}
              isRed={!friendIsRed}
              scale={scale}
              draggable={interactive}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
