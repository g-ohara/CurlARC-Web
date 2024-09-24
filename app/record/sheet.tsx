"use client";

import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";

import { Sheet, sheetConst } from "@/components/sheet";
import { Coordinate, DataPerEnd, Shot } from "@/types/model";

let count = 0;
let ends_data: DataPerEnd[] = [];
let shots: Shot[] = [];

function getScore(friendStones: Coordinate[], enemyStones: Coordinate[]): number {
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

      let _friendStones = friendStones.slice();
      let _enemyStones = enemyStones.slice();
      if (_friendStones.length + _enemyStones.length <= count) {
        if (count % 2 == 0 && !hammer || count % 2 == 1 && hammer) {
          _friendStones.push(stone);
          setFriendStones(_friendStones);
        } else {
          _enemyStones.push(stone);
          setEnemyStones(_enemyStones);
        }
      }
      else {
        if (count % 2 == 0 && !hammer || count % 2 == 1 && hammer) {
          _friendStones[index - 1] = stone;
          setFriendStones(_friendStones);
        } else {
          _enemyStones[index - 1] = stone;
          setEnemyStones(_enemyStones);
        }
      }
    }
  };

  function saveShot() {
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
      setFriendStones([]);
      setEnemyStones([]);
      count = 0;
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => { document.removeEventListener('click', handleClick); };
  }, [props.width, props.height]);

  useEffect(() => {
    if (props.isSubmitted) {
      props.setEndsData(ends_data);
    }
  }, [props.isSubmitted]);

  useEffect(() => {
    if (props.shotSaved) {
      saveShot();
    }
  }, [props.shotSaved]);

  const margin = 11;

  return (
    <Sheet
      canvasRef={canvasRef}
      width={475.0 * ratio + margin}
      height={823.0 * ratio + margin}
      friendStones={friendStones}
      enemyStones={enemyStones}
      friendIsRed={friendIsRed}
    />
  );
}
