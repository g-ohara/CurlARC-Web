import React, { useEffect, useRef, useState } from "react";
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions, cartesianToPolar, polarToCartesian, useParentSize } from "./utils";
import { drawSheet } from "./renderer";
import { Button } from "../ui/button";

interface ExtendedCoordinate extends Coordinate {
  key: string;
}

interface DraggableStoneProps {
  stone: ExtendedCoordinate;
  index: number;
  color: string;
  onDragEnd: (stoneKey: string, x: number, y: number) => void;
}

const INITIAL_STONE_POSITION = {
  r: SHEET_CONSTANTS.HOUSE_RADIUS,
  theta: -Math.PI/2,
};

class KeyGenerator {
  private nextKey = 0;

  generateKey(prefix: string): string {
    return `${prefix}-${this.nextKey++}`;
  }

  reset(): void {
    this.nextKey = 0;
  }
}

const DraggableStone: React.FC<DraggableStoneProps> = ({ stone, index, color, onDragEnd }) => {
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
    if (!stoneRef.current) return;
    
    setIsDragging(true);
    dragStartPosition.current = { x: clientX, y: clientY };
    initialStonePosition.current = { ...position };
    
    // カーソルスタイルを変更
    stoneRef.current.style.cursor = 'grabbing';
  };

  const handleDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - dragStartPosition.current.x;
    const deltaY = clientY - dragStartPosition.current.y;
    
    setPosition({
      x: initialStonePosition.current.x + deltaX,
      y: initialStonePosition.current.y + deltaY,
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    if (stoneRef.current) {
      stoneRef.current.style.cursor = 'grab';
    }
    
    // ドラッグ終了時にコールバックを呼び出し
    onDragEnd(
      stone.key,
      position.x + SHEET_CONSTANTS.STONE_RADIUS,
      position.y + SHEET_CONSTANTS.STONE_RADIUS
    );
  };

  // マウスイベントハンドラ
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // タッチイベントハンドラ
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
        cursor: isDragging ? 'grabbing' : 'grab',
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
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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
}: SheetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, parentSize } = useParentSize();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  
  const friendKeyGenerator = useRef(new KeyGenerator());
  const enemyKeyGenerator = useRef(new KeyGenerator());
  
  const [localFriendStones, setLocalFriendStones] = useState<ExtendedCoordinate[]>([]);
  const [localEnemyStones, setLocalEnemyStones] = useState<ExtendedCoordinate[]>([]);

  // Update local stones when props change
  useEffect(() => {
    friendKeyGenerator.current.reset();
    setLocalFriendStones(friendStones.map(stone => ({
      ...stone,
      key: friendKeyGenerator.current.generateKey('friend'),
    })));
  }, [friendStones]);

  useEffect(() => {
    enemyKeyGenerator.current.reset();
    setLocalEnemyStones(enemyStones.map(stone => ({
      ...stone,
      key: enemyKeyGenerator.current.generateKey('enemy'),
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
        key: friendKeyGenerator.current.generateKey('friend'),
      };
      setLocalFriendStones([...localFriendStones, newStone]);
    }
  };

  const addEnemyStone = () => {
    if (localEnemyStones.length < 8) {
      const newStone: ExtendedCoordinate = {
        index: localEnemyStones.length,
        ...INITIAL_STONE_POSITION,
        key: enemyKeyGenerator.current.generateKey('enemy'),
      };
      setLocalEnemyStones([...localEnemyStones, newStone]);
    }
  };

  // handleDragStopをhandleDragEndにリネーム
  const handleDragEnd = (stoneKey: string, x: number, y: number, isFriendStone: boolean) => {
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;
    const { r, theta } = cartesianToPolar(x, y, centerX, centerY);

    if (isFriendStone) {
      setLocalFriendStones(stones => 
        stones.map(stone => stone.key === stoneKey ? { ...stone, r, theta } : stone)
      );
    } else {
      setLocalEnemyStones(stones => 
        stones.map(stone => stone.key === stoneKey ? { ...stone, r, theta } : stone)
      );
    }
  };

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
            onDragEnd={(stoneKey, x, y) => handleDragEnd(stoneKey, x, y, true)}
          />
        ))}
        {localEnemyStones.map((stone, index) => (
          <DraggableStone
            key={stone.key}
            stone={stone}
            index={index}
            color={friendIsRed ? 'yellow' : 'red'}
            onDragEnd={(stoneKey, x, y) => handleDragEnd(stoneKey, x, y, false)}
          />
        ))}
      </div>
    </div>
  );
}