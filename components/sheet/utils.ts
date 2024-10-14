import { useEffect, useRef, useState } from "react";
import { SHEET_CONSTANTS } from "./constants";
import { Canvas2D, Dimensions, Point } from "./types";

export function calculateDimensions(parentSize: Dimensions): Dimensions {
  let { width, height } = parentSize;
  const aspectRatio = SHEET_CONSTANTS.ASPECT_RATIO;

  if (height / width > aspectRatio) {
    height = width * aspectRatio;
  } else {
    width = height / aspectRatio;
  }

  return {
    width: Math.max(width, SHEET_CONSTANTS.MIN_WIDTH),
    height: Math.max(height, SHEET_CONSTANTS.MIN_HEIGHT),
  };
}

export function polarToCartesian(r: number, theta: number, centerX: number, centerY: number): Point {
  return {
    x: r * Math.cos(theta) + centerX,
    y: centerY - r * Math.sin(theta),
  };
}

export function cartesianToPolar(x: number, y: number, centerX: number, centerY: number): { r: number; theta: number } {
  const dx = x - centerX;
  const dy = centerY - y;
  return {
    r: Math.sqrt(dx * dx + dy * dy),
    theta: Math.atan2(dy, dx),
  };
}

export function fillCircle(ctx: Canvas2D, x: number, y: number, r: number, color: string): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2.0, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 0.9;
  ctx.stroke();
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