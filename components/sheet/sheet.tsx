import React, { useEffect, useRef, useState } from "react";
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions, cartesianToPolar, polarToCartesian, useParentSize } from "./utils";
import { drawSheet } from "./renderer";
import { Button } from "../ui/button";

interface DraggableStoneProps {
  key: string;
  stone: Coordinate;
  index: number;
  color: string;
  onDragEnd: (index: number, x: number, y: number) => void;
  interactive: boolean;
  containerDimensions: Dimensions;
}

const INITIAL_STONE_POSITION = {
  r: SHEET_CONSTANTS.HOUSE_RADIUS * 1.5,
  theta: -Math.PI/2,
};

const DraggableStone: React.FC<DraggableStoneProps> = ({ 
  key,
  stone, 
  index, 
  color, 
  onDragEnd, 
  interactive, 
  containerDimensions 
}) => {
  const stoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    const { x, y } = polarToCartesian(
      stone.r,
      stone.theta,
      SHEET_CONSTANTS.SHEET_WIDTH / 2,
      SHEET_CONSTANTS.HOUSE_RADIUS
    );
    return { x: x - SHEET_CONSTANTS.STONE_RADIUS, y: y - SHEET_CONSTANTS.STONE_RADIUS };
  });
  const dragStartPosition = useRef({ x: 0, y: 0 });
  const initialStonePosition = useRef({ x: 0, y: 0 });

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!interactive || !stoneRef.current) return;
    
    setIsDragging(true);
    dragStartPosition.current = { x: clientX, y: clientY };
    initialStonePosition.current = { ...position };
    
    stoneRef.current.style.cursor = 'grabbing';
  };

  const handleDrag = (clientX: number, clientY: number) => {
    if (!interactive || !isDragging) return;

    const deltaX = clientX - dragStartPosition.current.x;
    const deltaY = clientY - dragStartPosition.current.y;
    
    const newX = Math.max(0, Math.min(initialStonePosition.current.x + deltaX, containerDimensions.width - SHEET_CONSTANTS.STONE_RADIUS * 2));
    const newY = Math.max(0, Math.min(initialStonePosition.current.y + deltaY, containerDimensions.height - SHEET_CONSTANTS.STONE_RADIUS * 2));
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    if (!interactive || !isDragging) return;
    
    setIsDragging(false);
    if (stoneRef.current) {
      stoneRef.current.style.cursor = interactive ? 'grab' : 'default';
    }
    
    onDragEnd(
      index,
      position.x + SHEET_CONSTANTS.STONE_RADIUS,
      position.y + SHEET_CONSTANTS.STONE_RADIUS
    );
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    const { x, y } = polarToCartesian(
      stone.r,
      stone.theta,
      SHEET_CONSTANTS.SHEET_WIDTH / 2,
      SHEET_CONSTANTS.HOUSE_RADIUS
    );
    setPosition({ x: x - SHEET_CONSTANTS.STONE_RADIUS, y: y - SHEET_CONSTANTS.STONE_RADIUS });
  }, [stone.r, stone.theta]);

  return (
    <div
      ref={stoneRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: SHEET_CONSTANTS.STONE_RADIUS * 2,
        height: SHEET_CONSTANTS.STONE_RADIUS * 2,
        backgroundColor: color,
        borderRadius: '50%',
        cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: color === 'yellow' ? 'black' : 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        userSelect: 'none',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.1s',
      }}
      onMouseDown={interactive ? handleMouseDown : undefined}
      onTouchStart={interactive ? handleTouchStart : undefined}
    >
      {index + 1}
    </div>
  );
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

  const handleDragEnd = (index: number, x: number, y: number, isFriendStone: boolean) => {
    if (!interactive || !onStonePositionChange) return;

    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;
    const { r, theta } = cartesianToPolar(x, y, centerX, centerY);

    if (isFriendStone) {
      onStonePositionChange(selectedEndIndex, selectedShotIndex, true, { r, theta, index });
    } else {
      onStonePositionChange(selectedEndIndex, selectedShotIndex, false, { r, theta, index});
    }
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

  return (
    <div className={className} ref={containerRef}>
      {interactive && (
        <>
          <div className="flex gap-2 mb-2">
            <Button 
              onClick={() => addStone(true)}
              disabled={friendStones.length >= 8}
            >
              Add Friend Stone
            </Button>
            <Button 
              onClick={() => addStone(false)}
              disabled={enemyStones.length >= 8}
            >
              Add Enemy Stone
            </Button>
          </div>
          <div className="mb-2">
            <span className="mr-4">Friend Stones: {friendStones.length}/8</span>
            <span>Enemy Stones: {enemyStones.length}/8</span>
          </div>
        </>
      )}
      <div style={{ position: 'relative', width: dimensions.width, height: dimensions.height }}>
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{ position: 'absolute' }}
        />
        {friendStones.map((stone, index) => (
          <DraggableStone
            key={`friend-${index}`}
            stone={stone}
            index={index}
            color={friendIsRed ? 'red' : 'yellow'}
            onDragEnd={(index, x, y) => handleDragEnd(index, x, y, true)}
            interactive={interactive}
            containerDimensions={dimensions}
          />
        ))}
        {enemyStones.map((stone, index) => (
          <DraggableStone
            key={`enemy-${index}`}
            stone={stone}
            index={index}
            color={friendIsRed ? 'yellow' : 'red'}
            onDragEnd={(index, x, y) => handleDragEnd(index, x, y, false)}
            interactive={interactive}
            containerDimensions={dimensions}
          />
        ))}
      </div>
    </div>
  );
}