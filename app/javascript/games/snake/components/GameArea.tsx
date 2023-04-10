import React, { useCallback, useEffect, useRef, useState } from "react";
import { clearBoard, drawObject, generateRandomPosition } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import { GameState, changeDirection, moveSnake } from "../store/reducers";

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
    drawObject(ctx, [food], "red");
  }, [ctx, snake]);

  // start moving the snake
  useEffect(() => {
    dispatch(moveSnake());
  }, [])

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
