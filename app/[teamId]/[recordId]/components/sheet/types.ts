import { RecordDetail } from "@/types/model";

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
  record: RecordDetail;
  setRecord: React.Dispatch<React.SetStateAction<RecordDetail>>;
  selectedEndIndex: number;
  selectedShotIndex: number;
  setSelectedShotIndex: React.Dispatch<React.SetStateAction<number>>;
}