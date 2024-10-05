import React, { useEffect, useRef, useState } from "react";
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions } from "./utils";
import { drawSheet, drawAllStones } from "./renderer";

function useParentSize() {
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

export function Sheet({
  friendStones = [],
  enemyStones = [],
  friendIsRed,
  className,
  interactive = false,
}: SheetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, parentSize } = useParentSize();
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: SHEET_CONSTANTS.MIN_WIDTH,
    height: SHEET_CONSTANTS.MIN_HEIGHT,
  });
  const [stones, setStones] = useState<Coordinate[]>([]);

  useEffect(() => {
    setDimensions(calculateDimensions(parentSize));
  }, [parentSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ratio = dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH;
    
    // drawSheet関数を呼び出し、canvasオブジェクトを渡す
    drawSheet(canvas, ratio);
    
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2 * ratio;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS * ratio;
    
    drawAllStones(ctx, friendStones, friendIsRed, ratio, centerX, centerY);
    drawAllStones(ctx, enemyStones, !friendIsRed, ratio, centerX, centerY);
    drawAllStones(ctx, stones, friendIsRed, ratio, centerX, centerY);
  }, [dimensions, friendStones, enemyStones, friendIsRed, stones]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x, y);

    const r = Math.sqrt((x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2);
    const theta = Math.atan2(canvas.height / 2 - y, x - canvas.width / 2);
    
    setStones(prev => [...prev, { r, theta, index: prev.length + 1 }]);
  };

  return (
    <div className={className} ref={containerRef}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleCanvasClick}
      />
    </div>
  );
}