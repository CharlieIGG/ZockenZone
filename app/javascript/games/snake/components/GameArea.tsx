import React, { useEffect, useRef, useState } from "react";
import { clearBoard, drawObject, generateRandomPosition } from "../utilities";
import { useSelector } from "react-redux";
import { GameState } from "../store/reducers";

export interface ICanvasBoard {
  height: number;
  width: number;
}


export const GameArea = ({ height, width }: ICanvasBoard) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const snake = useSelector((state: GameState) => state.snake);
  const [fruitPosition, setFruitPosition] = useState(generateRandomPosition());


  useEffect(() => { 
    const canvasContext = canvasRef.current?.getContext("2d") || null
    setCtx(canvasContext);
    clearBoard(ctx)
    drawObject(ctx, snake, "green");
    drawObject(ctx, [fruitPosition], "red");    
  }, [ctx]);


  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "3px solid black",
      }}
      height={height}
      width={width}
    />
  );
};