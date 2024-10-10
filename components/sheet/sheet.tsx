import React, { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions, cartesianToPolar, polarToCartesian } from "./utils";
import { drawSheet } from "./renderer";
import { Button } from "../ui/button";

interface ExtendedCoordinate extends Coordinate {
  key: string;
}

interface DraggableStoneProps {
  stone: ExtendedCoordinate;
  index: number;
  color: string;
  onStop: (stoneKey: string, x: number, y: number) => void;
  ratio: number;
}

const INITIAL_STONE_POSITION = {
  r: SHEET_CONSTANTS.HOUSE_RADIUS,
  theta: -Math.PI/2,
};

const DraggableStone: React.FC<DraggableStoneProps> = ({ stone, index, color, onStop, ratio }) => {
  const { x, y } = polarToCartesian(
    stone.r,
    stone.theta,
    SHEET_CONSTANTS.SHEET_WIDTH / 2,
    SHEET_CONSTANTS.HOUSE_RADIUS
  );

  return (
    <Draggable
      position={{
        x: x * ratio - SHEET_CONSTANTS.STONE_RADIUS * ratio,
        y: y * ratio - SHEET_CONSTANTS.STONE_RADIUS * ratio
      }}
      onStop={(_e: DraggableEvent, data: DraggableData) => {
        onStop(stone.key, data.x / ratio + SHEET_CONSTANTS.STONE_RADIUS, data.y / ratio + SHEET_CONSTANTS.STONE_RADIUS);
      }}
      bounds="parent"
    >
      <div
        style={{
          width: SHEET_CONSTANTS.STONE_RADIUS * 2 * ratio,
          height: SHEET_CONSTANTS.STONE_RADIUS * 2 * ratio,
          backgroundColor: color,
          borderRadius: '50%',
          cursor: 'grab',
          touchAction: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: color === 'yellow' ? 'black' : 'white',
          fontWeight: 'bold',
          fontSize: `${14 * ratio}px`,
        }}
      >
        {index + 1}
      </div>
    </Draggable>
  );
};

function useParentSize() {
  const [parentSize, setParentSize] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      setParentSize({
        width: Math.max(width, SHEET_CONSTANTS.MIN_WIDTH),
        height: Math.max(height, SHEET_CONSTANTS.MIN_HEIGHT),
      });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return { containerRef, parentSize };
}

let nextKey = 0;
function generateKey() {
  return `stone-${nextKey++}`;
}

export function Sheet({
  friendStones = [],
  enemyStones = [],
  friendIsRed,
  className,
  interactive = false,
}: SheetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, parentSize } = useParentSize();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  
  const [localFriendStones, setLocalFriendStones] = useState<ExtendedCoordinate[]>([]);
  const [localEnemyStones, setLocalEnemyStones] = useState<ExtendedCoordinate[]>([]);

  // Update local stones when props change
  useEffect(() => {
    setLocalFriendStones(friendStones.map(stone => ({
      ...stone,
      key: generateKey(),
    })));
  }, [friendStones]);

  useEffect(() => {
    setLocalEnemyStones(enemyStones.map(stone => ({
      ...stone,
      key: generateKey(),
    })));
  }, [enemyStones]);

  useEffect(() => {
    setDimensions(calculateDimensions(parentSize));
  }, [parentSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ratio = dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(ratio, ratio);
    drawSheet(canvas, 1);
    ctx.restore();
  }, [dimensions]);

  const handleDragStop = (stoneKey: string, x: number, y: number, isFriendStone: boolean) => {
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;
    const { r, theta } = cartesianToPolar(x, y, centerX, centerY);

    if (isFriendStone) {
      const newFriendStones = localFriendStones.map(stone =>
        stone.key === stoneKey ? { ...stone, r, theta } : stone
      );
      setLocalFriendStones(newFriendStones);
    } else {
      const newEnemyStones = localEnemyStones.map(stone =>
        stone.key === stoneKey ? { ...stone, r, theta } : stone
      );
      setLocalEnemyStones(newEnemyStones);
    }
  };

  const addFriendStone = () => {
    if (localFriendStones.length < 8) {
      const newStone: ExtendedCoordinate = {
        index: localFriendStones.length,
        ...INITIAL_STONE_POSITION,
        key: generateKey(),
      };
      setLocalFriendStones([...localFriendStones, newStone]);
    }
  };

  const addEnemyStone = () => {
    if (localEnemyStones.length < 8) {
      const newStone: ExtendedCoordinate = {
        index: localEnemyStones.length,
        ...INITIAL_STONE_POSITION,
        key: generateKey(),
      };
      setLocalEnemyStones([...localEnemyStones, newStone]);
    }
  };

  const ratio = dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH;

  return (
    <div className={className} ref={containerRef}>
      <div className="flex gap-2 mb-2">
        <Button 
          onClick={addFriendStone}
          disabled={localFriendStones.length >= 8}
        >
          味方の石を追加
        </Button>
        <Button 
          onClick={addEnemyStone}
          disabled={localEnemyStones.length >= 8}
        >
          相手の石を追加
        </Button>
      </div>
      <div className="mb-2">
        <span className="mr-4">味方の石: {localFriendStones.length}/8</span>
        <span>相手の石: {localEnemyStones.length}/8</span>
      </div>
      <div style={{ position: 'relative', width: dimensions.width, height: dimensions.height }}>
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{ position: 'absolute' }}
        />
        {localFriendStones.map((stone, index) => (
          <DraggableStone
            key={stone.key}
            stone={stone}
            index={index}
            color={friendIsRed ? 'red' : 'yellow'}
            onStop={(stoneKey, x, y) => handleDragStop(stoneKey, x, y, true)}
            ratio={ratio}
          />
        ))}
        {localEnemyStones.map((stone, index) => (
          <DraggableStone
            key={stone.key}
            stone={stone}
            index={index}
            color={friendIsRed ? 'yellow' : 'red'}
            onStop={(stoneKey, x, y) => handleDragStop(stoneKey, x, y, false)}
            ratio={ratio}
          />
        ))}
      </div>
    </div>
  );
}