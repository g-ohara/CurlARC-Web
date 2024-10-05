"use client";

import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { Sheet, sheetConst } from "@/components/sheet";
import { Coordinate, DataPerEnd, Shot } from "@/types/model";

// Helper functions
const getSortedStones = (stones: Coordinate[]) => stones.map(stone => stone.r).sort((a, b) => a - b);

function calculateScore(friendStones: Coordinate[], enemyStones: Coordinate[]): number {
  const friendRadius = getSortedStones(friendStones);
  const enemyRadius = getSortedStones(enemyStones);

  if (friendRadius[0] < enemyRadius[0]) {
    return friendRadius.reduce((score, radius, i) => (radius < enemyRadius[0] ? ++score : score), 0);
  } else {
    return enemyRadius.reduce((score, radius, i) => (radius < friendRadius[0] ? --score : score), 0);
  }
}

export default function RecordSheet(props: Readonly<{
  width: number;
  height: number;
  putStone: boolean;
  setPutStone: Dispatch<SetStateAction<boolean>>;
  setEndsData: Dispatch<SetStateAction<DataPerEnd[]>>;
  isSubmitted: boolean;
  shotSaved: boolean;
}>) {
  const [friendStones, setFriendStones] = useState<Coordinate[]>([]);
  const [enemyStones, setEnemyStones] = useState<Coordinate[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ratio = Math.min(props.width / 475.0, props.height / 823.0);
  let count = useRef<number>(0);
  let shots = useRef<Shot[]>([]);
  let endsData = useRef<DataPerEnd[]>([]);
  const hammer = false;
  const friendIsRed = true;

  // Shot saving logic
  function saveShot() {
    const shot: Shot = {
      type: "Unknown",
      success_rate: 100,
      shooter: "Unknown",
      stones: { friend_stones: friendStones, enemy_stones: enemyStones },
    };

    shots.current.push(shot);
    count.current++;

    // Every 4 shots is considered an "end"
    if (count.current >= 4) {
      const end: DataPerEnd = {
        score: calculateScore(friendStones, enemyStones),
        shots: [...shots.current],
      };

      endsData.current.push(end);
      shots.current = [];
      setFriendStones([]);
      setEnemyStones([]);
      count.current = 0;
    }
  }

  // Handle click on canvas
  const handleClick = (event: MouseEvent) => {
    if (canvasRef.current?.contains(event.target as Node) && count.current < 16) {
      const click_x = event.clientX - canvasRef.current.offsetLeft;
      const click_y = event.clientY - canvasRef.current.offsetTop;
      const new_x = (click_x - 10) / ratio - sheetConst.width / 2;
      const new_y = sheetConst.radius - (click_y - 10) / ratio;
      const new_r = Math.sqrt(new_x * new_x + new_y * new_y);
      const new_theta = Math.atan2(new_y, new_x);
      const stone: Coordinate = { index: Math.floor(count.current / 2) + 1, r: new_r, theta: new_theta };

      const updateStones = (stones: Coordinate[], setStones: Dispatch<SetStateAction<Coordinate[]>>, index: number) => {
        const updatedStones = [...stones];
        if (index >= stones.length) {
          updatedStones.push(stone);
        } else {
          updatedStones[index] = stone;
        }
        setStones(updatedStones);
      };

      if (count.current % 2 === 0 && !hammer || count.current % 2 === 1 && hammer) {
        updateStones(friendStones, setFriendStones, stone.index - 1);
      } else {
        updateStones(enemyStones, setEnemyStones, stone.index - 1);
      }

      props.setPutStone(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [friendStones, enemyStones, ratio]);

  useEffect(() => {
    if (props.isSubmitted) {
      props.setEndsData(endsData.current);
    }
  }, [props.isSubmitted]);

  useEffect(() => {
    if (props.shotSaved) {
      saveShot();
    }
  }, [props.shotSaved]);

  return (
    <Sheet
      canvasRef={canvasRef}
      friendStones={friendStones}
      enemyStones={enemyStones}
      friendIsRed={friendIsRed}
    />
  );
}
