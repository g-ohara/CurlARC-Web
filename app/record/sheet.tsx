"use client";

import { useEffect, useRef } from "react";

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
    width: 475.0 * ratio,
    height: 823.0 * ratio,
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

export function drawSheet(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  x: number,
  y: number,
  ratio: number,
  stones: [number, number][],
  hammerIsRed: boolean,
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
    stones.forEach((stone, index) => {
      const hammer: boolean = index % 2 == 1;
      const red: boolean = (hammerIsRed && hammer) || (!hammerIsRed && !hammer);
      drawStone(ctx, stone[0], stone[1], ratio, red, ~~(index / 2) + 1);
    });
  }
}

let count = 0;

export function saveShot() { ++count; }

export default function Sheet() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let stones: [number, number][] = [];
  const x = 10;
  const y = 10;
  const ratio = 0.9;
  let putStone = false;
  let hammer = false;

  const handleClick = (event: MouseEvent) => {
    if (canvasRef.current?.contains(event.target as Node) && count < 16) {
      const click_x = event.clientX - canvasRef.current.offsetLeft;
      const click_y = event.clientY - canvasRef.current.offsetTop;
      putStone = true;
      if (stones.length <= count) {
        stones.push([click_x, click_y]);
      }
      else {
        stones[count] = [click_x, click_y];
      }
      drawSheet(canvasRef, x, y, ratio, stones, hammer);
    }
  };

  useEffect(() => {

    drawSheet(canvasRef, x, y, ratio, stones, hammer);
    document.addEventListener('click', handleClick);

    // Cleanup function to remove event listener when component unmounts
    return () => { document.removeEventListener('click', handleClick); };
  }, []);

  return (
    <canvas ref={canvasRef} width={475} height={823} />
  );
}
