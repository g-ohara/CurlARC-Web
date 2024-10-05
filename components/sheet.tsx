import { Coordinate } from "@/types/model";
import { useEffect, useState, useRef } from "react";

// Types
type Canvas2D = CanvasRenderingContext2D;
type Dimensions = { width: number; height: number };

// Constants
const SHEET_CONSTANTS = {
  ASPECT_RATIO: (6.40 + 1.83) / 4.75,
  MIN_WIDTH: 100,
  MIN_HEIGHT: 100 / (6.40 + 1.83),
  HOUSE_WIDTH_RATIO: 20, // ハウスの直径がシートの幅の1/20
  MIN_HOUSE_RADIUS: 5,
  STONE_HOUSE_RATIO: 0.15, // ストーンの直径がハウスの直径の15%
} as const;

// Custom Hook
function useParentSize() {
  const [parentSize, setParentSize] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      setParentSize({
        width: Math.max(width, SHEET_CONSTANTS.MIN_WIDTH),
        height: Math.max(height, SHEET_CONSTANTS.MIN_HEIGHT),
      });
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return { containerRef, parentSize };
}

// Utility Functions
const calculateDimensions = (parentSize: Dimensions): Dimensions => {
  let { width, height } = parentSize;
  const aspectRatio = SHEET_CONSTANTS.ASPECT_RATIO;

  // アスペクト比に基づいてwidthまたはheightを調整
  if (height / width > aspectRatio) {
    height = width * aspectRatio;
  } else {
    width = height / aspectRatio;
  }

  return {
    width: Math.max(width, SHEET_CONSTANTS.MIN_WIDTH),
    height: Math.max(height, SHEET_CONSTANTS.MIN_HEIGHT),
  };
};

function fillCircle(
  ctx: Canvas2D, x: number, y: number, r: number, color: string
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2.0, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 0.6;
  ctx.stroke();
}

export const sheetConst = {
  width: 475.0,
  height: 823.0,
  radius: 182.9,
};

function drawHouse(ctx: Canvas2D, x: number, y: number, r: number) {
  const ratio = r / 182.9;
  fillCircle(ctx, x, y, 182.9 * ratio, "blue");
  fillCircle(ctx, x, y, 121.9 * ratio, "white");
  fillCircle(ctx, x, y, 61.0 * ratio, "red");
  fillCircle(ctx, x, y, 15.2 * ratio, "white");
}

function drawIce(ctx: Canvas2D, ratio: number) {
  const x = 0;
  const y = 0;

  const sheet = {
    x: x,
    y: y,
    width: sheetConst.width * ratio,
    height: sheetConst.height * ratio,
  };

  const house = {
    x: sheet.x + sheet.width / 2,
    y: sheet.y + 182.9 * ratio,
    r: 182.9 * ratio,
  };

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  ctx.rect(sheet.x, sheet.y, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "white";
  ctx.fill();

  const borderOffset = 0.5;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.strokeRect(
    borderOffset, 
    borderOffset, 
    ctx.canvas.width - borderOffset * 4, 
    ctx.canvas.height - borderOffset * 4
  );

  drawHouse(ctx, house.x, house.y, house.r);

  ctx.moveTo(sheet.x, sheet.y + house.r);
  ctx.lineTo(sheet.x + sheet.width, sheet.y + house.r);
  ctx.stroke();

  ctx.moveTo(sheet.x + sheet.width / 2, sheet.y);
  ctx.lineTo(sheet.x + sheet.width / 2, sheet.y + sheet.height);
  ctx.stroke();
}

function drawStone(
  ctx: Canvas2D,
  x: number,
  y: number,
  ratio: number,
  red: boolean,
  count: number
) {
  let r = 14.55 * ratio;
  fillCircle(ctx, x, y, r, "grey");
  fillCircle(ctx, x, y, r * 0.7, red ? "red" : "yellow");
  ctx.fillStyle = "black";
  ctx.fillText(String(count), x - r * 0.28, y + r * 0.36);
}

function drawSheet(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  ratio: number,
  friendStones: Coordinate[],
  enemyStones: Coordinate[],
  friendIsRed: boolean
) {
  if (canvasRef.current) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get context");

    drawIce(ctx, ratio);

    friendStones.forEach((stone) => {
      const { r, theta } = stone;
      const stone_x = (r * Math.cos(theta) + sheetConst.width / 2) * ratio;
      const stone_y = (sheetConst.radius - r * Math.sin(theta)) * ratio;
      drawStone(ctx, stone_x, stone_y, ratio, friendIsRed, stone.index);
    });

    enemyStones.forEach((stone) => {
      const { r, theta } = stone;
      const stone_x = (r * Math.cos(theta) + sheetConst.width / 2) * ratio;
      const stone_y = (sheetConst.radius - r * Math.sin(theta)) * ratio;
      drawStone(ctx, stone_x, stone_y, ratio, !friendIsRed, stone.index);
    });
  }
}

// Main Component
interface SheetProps {
  // canvasRef: React.RefObject<HTMLCanvasElement>;
  friendStones?: Coordinate[];
  enemyStones?: Coordinate[];
  friendIsRed: boolean;
  className?: string;
  interactive?: boolean; // 操作を有効にするかどうか
}

export function Sheet({
  // canvasRef,
  friendStones = [],
  enemyStones = [],
  friendIsRed,
  className,
  interactive = false, // デフォルトは操作不可
}: SheetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, parentSize } = useParentSize();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  const [stones, setStones] = useState<Coordinate[]>([]); // 新しく追加される石の状態
  const [dragging, setDragging] = useState<number | null>(null); // ドラッグ中の石のID

  useEffect(() => {
    setDimensions(calculateDimensions(parentSize));
  }, [parentSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = dimensions.width / sheetConst.width;
    drawSheet(canvasRef, ratio, friendStones, enemyStones, friendIsRed);
  }, [canvasRef, dimensions, friendStones, enemyStones, friendIsRed]);

  // クリックによる石の追加
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const r = Math.sqrt((x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2);
    const theta = Math.atan2(canvas.height / 2 - y, x - canvas.width / 2);

    setStones([...stones, { r, theta, index: stones.length + 1 }]);
  };

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleCanvasClick}
      />
    </div>
  );
}
