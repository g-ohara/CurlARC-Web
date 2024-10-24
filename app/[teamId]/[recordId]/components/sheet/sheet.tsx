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
import NextShotButton from "./buttons/nextShotButton";

interface StoneProps {
  id: string;
  index: number;
  r: number;
  theta: number;
  isRed: boolean;
  scale: number;
}

function DraggableStone({ id, index, r, theta, isRed, scale }: StoneProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const { x, y } = polarToCartesian(r, theta, SHEET_CONSTANTS.SHEET_WIDTH / 2, SHEET_CONSTANTS.HOUSE_RADIUS);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

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
        backgroundColor: isRed ? 'red' : 'yellow',
        border: '4px solid grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'grab',
        fontSize: 16 * scale,
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
  const selectedShot = selectedEnd.shots[selectedShotIndex];
  const friendStones = selectedShot.stones.friend_stones;
  const enemyStones = selectedShot.stones.enemy_stones;

  // TODO: Get whether friend color from record
  const friendIsRed = true;

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

      return { ...prevRecord, ends_data: newEndsData };
    });
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (!interactive || !onStonePositionChange) return;
    const { active, delta } = event;

    const id = active.id as string;
    const isFriendStone = id.startsWith('friend');
    const index = parseInt(id.split('-')[1]);

    const stones = isFriendStone ? friendStones : enemyStones;
    const stone = stones[index];

    if (!stone) return;

    const { x: oldX, y: oldY } = polarToCartesian(
      stone.r,
      stone.theta,
      SHEET_CONSTANTS.SHEET_WIDTH / 2,
      SHEET_CONSTANTS.HOUSE_RADIUS
    );

    const newX = oldX + delta.x / scale;
    const newY = oldY + delta.y / scale;

    const { r, theta } = cartesianToPolar(
      newX,
      newY,
      SHEET_CONSTANTS.SHEET_WIDTH / 2,
      SHEET_CONSTANTS.HOUSE_RADIUS
    );
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
        {interactive && (
          <>
            <div className="flex gap-2 mb-2">
              <NextShotButton
                record={record}
                setRecord={setRecord}
                selectedEndIndex={selectedEndIndex}
                selectedShotIndex={selectedShotIndex}
                setSelectedShotIndex={setSelectedShotIndex}
                onStonePositionChange={onStonePositionChange}
              />
            </div>
            <div className="mb-2">
              <span className="mr-4">Friend Stones: {friendStones?.length}/8</span>
              <span>Enemy Stones: {enemyStones?.length}/8</span>
            </div>
          </>
        )}
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
          {friendStones.map((stone, index) => (
            <DraggableStone
              key={`friend-${index}`}
              id={`friend-${index}`}
              index={index}
              r={stone.r}
              theta={stone.theta}
              isRed={friendIsRed}
              scale={scale}
            />
          ))}
          {enemyStones.map((stone, index) => (
            <DraggableStone
              key={`enemy-${index}`}
              id={`enemy-${index}`}
              index={index}
              r={stone.r}
              theta={stone.theta}
              isRed={!friendIsRed}
              scale={scale}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
