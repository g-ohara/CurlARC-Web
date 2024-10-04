'use client';

import { Sheet } from "@/components/sheet";
import { Coordinate } from "@/types/model";

type props = {
  friendStones: Coordinate[];
  enemyStones: Coordinate[];
};

export const SheetContainer = ({friendStones, enemyStones} : props) => {

  return (
    <Sheet
    className="h-full w-full"
    friendStones={friendStones}
    enemyStones={enemyStones}
    friendIsRed={true}
  />
  )
}