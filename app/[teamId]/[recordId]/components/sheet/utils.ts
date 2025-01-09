import { useEffect, useRef, useState } from "react";
import { SHEET_CONSTANTS } from "./constants";
import { Dimensions, Point } from "./types";

export function calculateDimensions(parentSize: Dimensions): Dimensions {
  let { width, height } = parentSize;
  const aspectRatio = SHEET_CONSTANTS.ASPECT_RATIO;

  if (height / width > aspectRatio) {
    height = width * aspectRatio;
  } else {
    width = height / aspectRatio;
  }
  return {
    width: width,
    height: height,
  };
}

const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
const centerY = SHEET_CONSTANTS.HOUSE_RADIUS + SHEET_CONSTANTS.STONE_RADIUS * 2;

export function polarToCartesian(r: number, theta: number): Point {
  return {
    x: r * Math.cos(theta) + centerX,
    y: centerY - r * Math.sin(theta),
  };
}

export function cartesianToPolar(x: number, y: number): { r: number; theta: number } {
  const dx = x - centerX;
  const dy = centerY - y;
  return {
    r: Math.sqrt(dx * dx + dy * dy),
    theta: Math.atan2(dy, dx),
  };
}

export function useParentSize() {
  const [parentSize, setParentSize] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      setParentSize({
        width: Math.max(width, SHEET_CONSTANTS.MIN_WIDTH),
        height: Math.max(height, SHEET_CONSTANTS.MIN_HEIGHT),
      });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return { containerRef, parentSize };
}

export function drawSheet(ctx: CanvasRenderingContext2D, width: number) {
  const {
    SHEET_WIDTH,
    SHEET_HEIGHT,
    BORDER_OFFSET,
    HOUSE_RADIUS,
    HOUSE_CIRCLES,
    HOUSE_COLORS,
    STONE_RADIUS,
  } = SHEET_CONSTANTS;

  const scale = width / SHEET_WIDTH;
  ctx.save();
  ctx.scale(scale, scale);

  // Clear canvas
  ctx.clearRect(0, 0, SHEET_WIDTH, SHEET_HEIGHT + STONE_RADIUS * 4);

  // Draw ice
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, SHEET_WIDTH, SHEET_HEIGHT + STONE_RADIUS * 4);

  // Draw sheet border
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(
    BORDER_OFFSET,
    BORDER_OFFSET + STONE_RADIUS * 2,
    SHEET_WIDTH - BORDER_OFFSET * 2,
    SHEET_HEIGHT - BORDER_OFFSET * 2
  );

  // Draw house
  HOUSE_CIRCLES.forEach((radius, index) => {
    ctx.beginPath();
    ctx.arc(SHEET_WIDTH / 2, HOUSE_RADIUS + STONE_RADIUS * 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = HOUSE_COLORS[index];
    ctx.fill();
  });

  // Draw center line
  ctx.beginPath();
  ctx.moveTo(0, HOUSE_RADIUS + STONE_RADIUS * 2);
  ctx.lineTo(SHEET_WIDTH, HOUSE_RADIUS + STONE_RADIUS * 2);
  ctx.moveTo(SHEET_WIDTH / 2, STONE_RADIUS * 2);
  ctx.lineTo(SHEET_WIDTH / 2, SHEET_HEIGHT + STONE_RADIUS * 2);
  ctx.stroke();

  ctx.restore();
}
