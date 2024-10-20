export type Canvas2D = CanvasRenderingContext2D;
export type Dimensions = { width: number; height: number };

export interface Coordinate {
  r: number;
  theta: number;
  index: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface SheetDimensions {
  width: number;
  height: number;
}

export interface HousePosition {
  x: number;
  y: number;
  r: number;
}

export interface SheetProps {
  friendStones?: Coordinate[];
  enemyStones?: Coordinate[];
  friendIsRed: boolean;
  className?: string;
  interactive?: boolean;
  onStonePositionChange: (endIndex: number, shotIndex: number, isFriendStone: boolean, newPosition: Coordinate) => void;
  selectedEndIndex: number;
  selectedShotIndex: number;
}