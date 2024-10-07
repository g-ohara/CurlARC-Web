import { Canvas2D, Coordinate } from './types';
import { SHEET_CONSTANTS, HOUSE_COLORS } from './constants';
import { fillCircle, polarToCartesian } from './utils';

export function drawHouse(ctx: Canvas2D, x: number, y: number): void {
  SHEET_CONSTANTS.HOUSE_CIRCLES.forEach((radius, i) => {
    fillCircle(ctx, x, y, radius, HOUSE_COLORS[i]);
  });
}

export function drawIce(ctx: Canvas2D): void {
  const { SHEET_WIDTH, SHEET_HEIGHT, BORDER_OFFSET, HOUSE_RADIUS } = SHEET_CONSTANTS;

  const houseCenter = {
    x: SHEET_WIDTH / 2,
    y: HOUSE_RADIUS,
  };

  // 背景を白でクリア
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 枠線描画
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.strokeRect(
    BORDER_OFFSET,
    BORDER_OFFSET,
    SHEET_WIDTH - BORDER_OFFSET * 2,
    SHEET_HEIGHT - BORDER_OFFSET * 2
  );

  // ハウスを描画
  drawHouse(ctx, houseCenter.x, houseCenter.y);

  // ライン描画
  ctx.beginPath();
  ctx.moveTo(0, houseCenter.y);
  ctx.lineTo(SHEET_WIDTH, houseCenter.y);
  ctx.moveTo(SHEET_WIDTH / 2, 0);
  ctx.lineTo(SHEET_WIDTH / 2, SHEET_HEIGHT);
  ctx.stroke();
}

export function drawStone(
  ctx: Canvas2D,
  r: number,
  theta: number,
  centerX: number,
  centerY: number,
  isRed: boolean,
  count: number
): void {
  // 極座標からデカルト座標に変換
  const { x, y } = polarToCartesian(r, theta, centerX, centerY);
  const stoneRadius = SHEET_CONSTANTS.STONE_RADIUS;

  // 石を描画
  fillCircle(ctx, x, y, stoneRadius, "grey");
  fillCircle(ctx, x, y, stoneRadius * 0.7, isRed ? "red" : "yellow");

  // 数字を石の中央に描画
  ctx.fillStyle = "black";
  ctx.fillText(String(count), x - stoneRadius * 0.28, y + stoneRadius * 0.36);
}

export function drawAllStones(
  ctx: Canvas2D,
  stones: Coordinate[],
  isRed: boolean,
  centerX: number,
  centerY: number
): void {
  // 各石を描画
  stones.forEach((stone) => {
    drawStone(ctx, stone.r, stone.theta, centerX, centerY, isRed, stone.index);
  });
}

export function drawSheet(canvas: HTMLCanvasElement, scale: number): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Failed to get canvas context");

  // スケールを設定
  ctx.save();
  ctx.scale(scale, scale);

  // シート全体の描画
  drawIce(ctx);

  // スケールのリセット
  ctx.restore();
}
