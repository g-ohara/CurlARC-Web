import React, { useEffect, useRef, useState } from "react";
import { Coordinate, Dimensions, SheetProps } from "./types";
import { SHEET_CONSTANTS } from "./constants";
import { calculateDimensions, cartesianToPolar } from "./utils";
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

  // parentSizeが変更されたときに、dimensionsを再計算する
  useEffect(() => {
    setDimensions(calculateDimensions(parentSize));
  }, [parentSize]);

  // dimensionsが変更されたときに、canvasを再描画する
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const ratio = dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH;

    // Canvas全体にスケーリングを適用
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 前の描画をクリア
    ctx.save(); // 現在の状態を保存
    ctx.scale(ratio, ratio); // スケーリングを適用

    // 描画
    drawSheet(canvas, 1); // シートを描画、スケール済みなので 1 を渡す
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS;

    drawAllStones(ctx, friendStones, friendIsRed, centerX, centerY);
    drawAllStones(ctx, enemyStones, !friendIsRed, centerX, centerY);
    drawAllStones(ctx, stones, friendIsRed, centerX, centerY);

    ctx.restore(); // 状態を元に戻す
  }, [dimensions, friendStones, enemyStones, friendIsRed, stones]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ratio = dimensions.width / SHEET_CONSTANTS.SHEET_WIDTH;
    const centerX = SHEET_CONSTANTS.SHEET_WIDTH / 2 * ratio;
    const centerY = SHEET_CONSTANTS.HOUSE_RADIUS * ratio;

    const { r, theta } = cartesianToPolar(x / ratio, y / ratio, centerX / ratio, centerY / ratio); // 論理座標系に変換

    setStones((prev) => [...prev, { r, theta, index: prev.length + 1 }]);
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
