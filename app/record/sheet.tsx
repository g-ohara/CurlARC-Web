"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

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

const sheetConst = {
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
  friendStones: Stone[],
  enemyStones: Stone[],
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

let count = 0;
let ends_data: End[] = [];
let shots: Shot[] = [];
let friendStones: Stone[] = [];
let enemyStones: Stone[] = [];

function getScore(friendStones: Stone[], enemyStones: Stone[]): number {
  const friendRadius = friendStones.map(stone => stone.r);
  const enemyRadius = enemyStones.map(stone => stone.r);

  friendRadius.sort((a, b) => a - b);
  enemyRadius.sort((a, b) => a - b);

  console.log(friendRadius);
  console.log(enemyRadius);

  if (friendRadius[0] < enemyRadius[0]) {
    let score = 0;
    for (let i = 0; i < friendRadius.length; ++i) {
      if (friendRadius[i] < enemyRadius[0]) {
        ++score;
      } else {
        break;
      }
    }
    return score;
  }
  else {
    let score = 0;
    for (let i = 0; i < enemyRadius.length; ++i) {
      if (enemyRadius[i] < friendRadius[0]) {
        --score;
      } else {
        break;
      }
    }
    return score;
  }
}

export function saveShot() {
  const shot = {
    index: shots.length + 1,
    type: "Unknown",
    success_rate: 100,
    shooter: "Unknown",
    stones: {
      friend_stones: friendStones.slice(),
      enemy_stones: enemyStones.slice(),
    },
  }
  shots.push(shot);
  ++count;

  if (count >= 4) {
    const end = {
      index: ends_data.length + 1,
      score: getScore(friendStones, enemyStones),
      shots: shots.slice(),
    }
    console.log(end);
    ends_data.push(end);
    shots = [];
    friendStones = [];
    enemyStones = [];
    count = 0;
  }
}

export default function Sheet(props: Readonly<{
  width: number;
  height: number;
  putStone: boolean;
  setPutStone: Dispatch<SetStateAction<boolean>>;
  setEndsData: Dispatch<SetStateAction<End[]>>;
  isSubmitted: boolean;
}>) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const x = 10;
  const y = 10;
  const ratio = Math.min(props.width / 475.0, props.height / 823.0);
  let hammer = false;
  let friendIsRed = true;

  const handleClick = (event: MouseEvent) => {
    if (canvasRef.current?.contains(event.target as Node) && count < 16) {
      const click_x = event.clientX - canvasRef.current.offsetLeft;
      const click_y = event.clientY - canvasRef.current.offsetTop;
      const new_x = (click_x - x) / ratio - sheetConst.width / 2;
      const new_y = sheetConst.radius - (click_y - y) / ratio;
      const new_r = Math.sqrt(new_x * new_x + new_y * new_y);
      const new_theta = Math.atan2(new_y, new_x);

      props.setPutStone(true);
      const index = Math.floor(count / 2) + 1;
      const stone = {
        index: index,
        r: new_r,
        theta: new_theta
      };
      if (friendStones.length + enemyStones.length <= count) {
        if (count % 2 == 0 && !hammer || count % 2 == 1 && hammer) {
          friendStones.push(stone);
        } else {
          enemyStones.push(stone);
        }
      }
      else {
        if (count % 2 == 0 && !hammer || count % 2 == 1 && hammer) {
          friendStones[index - 1] = stone;
        } else {
          enemyStones[index - 1] = stone;
        }
      }
      drawSheet(canvasRef, x, y, ratio, friendStones, enemyStones, friendIsRed);
    }
  };

  useEffect(() => {

    drawSheet(canvasRef, x, y, ratio, friendStones, enemyStones, friendIsRed);
    document.addEventListener('click', handleClick);

    // Cleanup function to remove event listener when component unmounts
    return () => { document.removeEventListener('click', handleClick); };
  }, [props.width, props.height]);

  useEffect(() => {
    if (props.isSubmitted) {
      props.setEndsData(ends_data);
    }
  }, [props.isSubmitted]);

  const margin = 11;

  return (
    <canvas
      ref={canvasRef}
      width={475.0 * ratio + margin}
      height={823.0 * ratio + margin}
    />
  );
}
