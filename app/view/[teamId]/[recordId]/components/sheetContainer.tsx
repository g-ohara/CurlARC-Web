'use client';

import { Sheet } from "@/components/sheet";
import { Coordinate } from "@/types/model";
import { useRef } from "react";

type props = {
  friendStones: Coordinate[];
  enemyStones: Coordinate[];
};

export const SheetContainer = ({friendStones, enemyStones} : props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <Sheet
    canvasRef={canvasRef}
    className="h-full w-full"
    friendStones={friendStones}
    enemyStones={enemyStones}
    friendIsRed={true}
  />
  )
}