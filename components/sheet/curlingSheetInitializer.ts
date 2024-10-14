import { Coordinate, Canvas2D } from './types';
import { SHEET_CONSTANTS, HOUSE_COLORS } from './constants';
import { fillCircle, polarToCartesian, cartesianToPolar } from './utils';

interface DraggableStone extends Coordinate {
  isRed: boolean;
  isFriendStone: boolean;
  isDragging: boolean;
}

class CurlingSheet {
  private canvas: HTMLCanvasElement;
  private ctx: Canvas2D;
  private stones: DraggableStone[] = [];
  private scale: number;
  private draggedStone: DraggableStone | null = null;
  public onStoneMove?: (isFriendStone: boolean, index: number, r: number, theta: number) => void;

  constructor(canvas: HTMLCanvasElement, scale: number = 1) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as Canvas2D;
    this.scale = scale;
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('touchstart', this.handleTouchStart);
    this.canvas.addEventListener('touchmove', this.handleTouchMove);
    this.canvas.addEventListener('touchend', this.handleTouchEnd);
  }

  private handleMouseDown = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    this.startDragging(offsetX / this.scale, offsetY / this.scale);
  }

  private handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    this.dragStone(offsetX / this.scale, offsetY / this.scale);
  }

  private handleMouseUp = () => {
    this.stopDragging();
  }

  private handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / this.scale;
    const y = (touch.clientY - rect.top) / this.scale;
    this.startDragging(x, y);
  }

  private handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / this.scale;
    const y = (touch.clientY - rect.top) / this.scale;
    this.dragStone(x, y);
  }

  private handleTouchEnd = () => {
    this.stopDragging();
  }

  private startDragging(x: number, y: number) {
    const stone = this.stones.find(s => this.isPointInStone(x, y, s));
    if (stone) {
      this.draggedStone = stone;
      stone.isDragging = true;
      this.draw();
    }
  }

  private dragStone(x: number, y: number) {
    if (this.draggedStone) {
      const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
      const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;
      const { r, theta } = cartesianToPolar(x, y, centerX, centerY);
      this.draggedStone.r = r;
      this.draggedStone.theta = theta;
      this.draw();

      if (this.onStoneMove) {
        this.onStoneMove(this.draggedStone.isFriendStone, this.draggedStone.index, r, theta);
      }
    }
  }

  private stopDragging() {
    if (this.draggedStone) {
      this.draggedStone.isDragging = false;
      this.draggedStone = null;
      this.draw();
    }
  }

  private isPointInStone(x: number, y: number, stone: DraggableStone): boolean {
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;
    const { x: stoneX, y: stoneY } = polarToCartesian(stone.r, stone.theta, centerX, centerY);
    const dx = x - stoneX;
    const dy = y - stoneY;
    return dx * dx + dy * dy <= SHEET_CONSTANTS.STONE_RADIUS * SHEET_CONSTANTS.STONE_RADIUS;
  }

  public addStone(r: number, theta: number, isRed: boolean, isFriendStone: boolean): void {
    this.stones.push({
      r,
      theta,
      index: this.stones.length,
      isRed,
      isFriendStone,
      isDragging: false
    });
    this.draw();
  }

  public clearStones(): void {
    this.stones = [];
    this.draw();
  }

  public draw(): void {
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    this.drawIce();
    this.drawAllStones();

    this.ctx.restore();
  }

  private drawIce(): void {
    const { SHEET_WIDTH, SHEET_HEIGHT, BORDER_OFFSET, HOUSE_RADIUS } = SHEET_CONSTANTS;

    const houseCenter = {
      x: SHEET_WIDTH / 2,
      y: HOUSE_RADIUS,
    };

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(
      BORDER_OFFSET,
      BORDER_OFFSET,
      SHEET_WIDTH - BORDER_OFFSET * 2,
      SHEET_HEIGHT - BORDER_OFFSET * 2
    );

    this.drawHouse(houseCenter.x, houseCenter.y);

    this.ctx.beginPath();
    this.ctx.moveTo(0, houseCenter.y);
    this.ctx.lineTo(SHEET_WIDTH, houseCenter.y);
    this.ctx.moveTo(SHEET_WIDTH / 2, 0);
    this.ctx.lineTo(SHEET_WIDTH / 2, SHEET_HEIGHT);
    this.ctx.stroke();
  }

  private drawHouse(x: number, y: number): void {
    SHEET_CONSTANTS.HOUSE_CIRCLES.forEach((radius, i) => {
      fillCircle(this.ctx, x, y, radius, HOUSE_COLORS[i]);
    });
  }

  private drawAllStones(): void {
    this.stones.forEach(stone => this.drawStone(stone));
  }

  private drawStone(stone: DraggableStone): void {
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;
    const { x, y } = polarToCartesian(stone.r, stone.theta, centerX, centerY);
    const stoneRadius = SHEET_CONSTANTS.STONE_RADIUS;

    fillCircle(this.ctx, x, y, stoneRadius, "grey");
    fillCircle(this.ctx, x, y, stoneRadius * 0.7, stone.isRed ? "red" : "yellow");

    const fontSize = stoneRadius * 1.1;
    this.ctx.font = `${fontSize}px Arial Bold`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "black";

    this.ctx.fillText(String(stone.index + 1), x, y);

    if (stone.isDragging) {
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, stoneRadius + 2, 0, Math.PI * 2);
      this.ctx.stroke();
    }
  }

  public getStoneCoordinates(): Coordinate[] {
    return this.stones.map(({ r, theta, index }) => ({ r, theta, index }));
  }
}

export function initializeCurlingSheet(canvasId: string, scale: number = 1): CurlingSheet {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) throw new Error(`Canvas with id ${canvasId} not found`);

  canvas.width = SHEET_CONSTANTS.SHEET_WIDTH * scale;
  canvas.height = SHEET_CONSTANTS.SHEET_HEIGHT * scale;

  return new CurlingSheet(canvas, scale);
}