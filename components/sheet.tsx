import { useEffect } from "react";
import { Coordinate } from "@/app/@types/model";

type Canvas2D = CanvasRenderingContext2D;

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

function drawIce(ctx: Canvas2D, x: number, y: number, ratio: number) {

  function drawHouse(ctx: Canvas2D, x: number, y: number, r: number) {
    const ratio = r / 182.9
    fillCircle(ctx, x, y, 182.9 * ratio, "blue");
    fillCircle(ctx, x, y, 121.9 * ratio, "white");
    fillCircle(ctx, x, y, 61.0 * ratio, "red");
    fillCircle(ctx, x, y, 15.2 * ratio, "white");
  }

  const sheet = {
    x: x,
    y: y,
    width: sheetConst.width * ratio,
    height: sheetConst.height * ratio,
  }

  const house = {
    x: sheet.x + sheet.width / 2,
    y: sheet.y + 182.9 * ratio,
    r: 182.9 * ratio,
  }

  ctx.beginPath();
  ctx.rect(sheet.x, sheet.y, sheet.width, sheet.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
  drawHouse(ctx, house.x, house.y, house.r);
  ctx.moveTo(sheet.x, sheet.y + house.r);
  ctx.lineTo(sheet.x + sheet.width, sheet.y + house.r);
  ctx.stroke();
  ctx.moveTo(sheet.x + sheet.width / 2, sheet.y);
  ctx.lineTo(sheet.x + sheet.width / 2, sheet.y + sheet.height);
  ctx.stroke();

  let xCenter = sheet.x + sheet.width / 2;
  let yTopHouse = sheet.y + house.r * 2;
  fillCircle(ctx, xCenter, yTopHouse + 137.2 * ratio, 2, "black");
  fillCircle(ctx, xCenter, yTopHouse + 228.6 * ratio, 2, "black");
  fillCircle(ctx, xCenter, yTopHouse + 320.0 * ratio, 2, "black");
}

function drawStone(
  ctx: Canvas2D,
  x: number,
  y: number,
  ratio: number,
  red: boolean,
  count: number,
) {
  let r = 14.55 * ratio;
  fillCircle(ctx, x, y, r, "grey")
  fillCircle(ctx, x, y, r * 0.7, (red) ? "red" : "yellow")
  ctx.fillStyle = "black";
  ctx.fillText(String(count), x - r * 0.28, y + r * 0.36);
}

function drawSheet(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  x: number,
  y: number,
  ratio: number,
  friendStones: Coordinate[],
  enemyStones: Coordinate[],
  friendIsRed: boolean,
) {
  if (canvasRef.current) {
    let ctx: Canvas2D;
    const canvas = canvasRef.current;
    const _ctx = canvas.getContext("2d");
    if (_ctx) {
      ctx = _ctx;
    } else {
      throw new Error("Failed to get context");
    }
    drawIce(ctx, x, y, ratio);

    friendStones.forEach(stone => {
      const r = stone.r
      const theta = stone.theta
      const stone_x = x + (r * Math.cos(theta) + sheetConst.width / 2) * ratio;
      const stone_y = y + (sheetConst.radius - r * Math.sin(theta)) * ratio;
      drawStone(ctx, stone_x, stone_y, ratio, friendIsRed, stone.index);
    });

    enemyStones.forEach(stone => {
      const r = stone.r
      const theta = stone.theta
      const stone_x = x + (r * Math.cos(theta) + sheetConst.width / 2) * ratio;
      const stone_y = y + (sheetConst.radius - r * Math.sin(theta)) * ratio;
      drawStone(ctx, stone_x, stone_y, ratio, !friendIsRed, stone.index);
    });
  }
}

export function Sheet(props: Readonly<{
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  friendStones: Coordinate[];
  enemyStones: Coordinate[];
  friendIsRed: boolean;
}>) {
  const x = 10;
  const y = 10;
  const ratio = Math.min(props.width / 475.0, props.height / 823.0);

  useEffect(() => {
    drawSheet(props.canvasRef, x, y, ratio, props.friendStones, props.enemyStones, props.friendIsRed);
  }, [props.width, props.height, props.friendStones, props.enemyStones, props.friendIsRed]);

  const margin = 11;

  return (
    <canvas
      ref={props.canvasRef}
      width={475.0 * ratio + margin}
      height={823.0 * ratio + margin}
    />
  );
}
