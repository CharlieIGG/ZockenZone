import React, { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_FOOD_DURATION, clearBoard, drawFood, drawObject } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import { GameState, changeDirection, moveSnake, spawnFruit } from "../store/reducers";

export interface ICanvasBoard {
  height: number;
  width: number;
}


export const GameArea = ({ height, width }: ICanvasBoard) => {
  const snake = useSelector((state: GameState) => state.snake);
  const food = useSelector((state: GameState) => state.food);
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // (re)draw the canvas
  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext("2d") || null
    setCtx(canvasContext);
    clearBoard(ctx)
    drawObject(ctx, snake, "green");
    drawFood(ctx, food);
  }, [ctx, snake]);

  // start moving the snake
  useEffect(() => {
    dispatch(moveSnake(0));
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(spawnFruit());
    }, DEFAULT_FOOD_DURATION);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "w":
        case "W":
        case "ArrowUp":
          dispatch(changeDirection({ direction: "UP" }))
          break;
        case "s":
        case "S":
        case "ArrowDown":
          dispatch(changeDirection({ direction: "DOWN" }))
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          dispatch(changeDirection({ direction: "LEFT" }))
          break;
        case "d":
        case "D":
        case "ArrowRight":
          event.preventDefault();
          dispatch(changeDirection({ direction: "RIGHT" }))
          break;
      }
    },
    [moveSnake]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvents);

    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
    };
  }, [handleKeyEvents]);

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
