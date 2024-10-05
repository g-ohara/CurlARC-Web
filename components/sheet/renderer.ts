import { Canvas2D, Coordinate } from './types';
import { SHEET_CONSTANTS, HOUSE_COLORS } from './constants';
import { fillCircle, polarToCartesian } from './utils';

export function drawHouse(ctx: Canvas2D, x: number, y: number, r: number): void {
  const ratio = r / SHEET_CONSTANTS.HOUSE_RADIUS;
  SHEET_CONSTANTS.HOUSE_CIRCLES.forEach((radius, i) => {
    fillCircle(ctx, x, y, radius * ratio, HOUSE_COLORS[i]);
  });
}

export function drawIce(ctx: Canvas2D, ratio: number): void {
  const { SHEET_WIDTH, SHEET_HEIGHT, BORDER_OFFSET, HOUSE_RADIUS } = SHEET_CONSTANTS;

  const sheet = {
    width: SHEET_WIDTH * ratio,
    height: SHEET_HEIGHT * ratio,
  };

  const houseCenter = {
    x: sheet.width / 2,
    y: HOUSE_RADIUS * ratio,
  };

  // Clear and fill background
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw border
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.strokeRect(
    BORDER_OFFSET,
    BORDER_OFFSET,
    ctx.canvas.width - BORDER_OFFSET * 4,
    ctx.canvas.height - BORDER_OFFSET * 4
  );

  // Draw house
  drawHouse(ctx, houseCenter.x, houseCenter.y, HOUSE_RADIUS * ratio);

  // Draw lines
  ctx.beginPath();
  ctx.moveTo(0, houseCenter.y);
  ctx.lineTo(sheet.width, houseCenter.y);
  ctx.moveTo(sheet.width / 2, 0);
  ctx.lineTo(sheet.width / 2, sheet.height);
  ctx.stroke();
}

export function drawStone(
  ctx: Canvas2D,
  r: number,
  theta: number,
  ratio: number,
  centerX: number,
  centerY: number,
  isRed: boolean,
  count: number
): void {
  const { x, y } = polarToCartesian(r * ratio, theta, centerX, centerY);
  const stoneRadius = SHEET_CONSTANTS.STONE_RADIUS * ratio;
  
  fillCircle(ctx, x, y, stoneRadius, "grey");
  fillCircle(ctx, x, y, stoneRadius * 0.7, isRed ? "red" : "yellow");
  
  ctx.fillStyle = "black";
  ctx.fillText(String(count), x - stoneRadius * 0.28, y + stoneRadius * 0.36);
}

export function drawAllStones(
  ctx: Canvas2D,
  stones: Coordinate[],
  isRed: boolean,
  ratio: number,
  centerX: number,
  centerY: number
): void {
  stones.forEach((stone) => {
    drawStone(ctx, stone.r, stone.theta, ratio, centerX, centerY, isRed, stone.index);
  });
}

export function drawSheet(canvas: HTMLCanvasElement, ratio: number): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Failed to get canvas context");
  
  drawIce(ctx, ratio);
}