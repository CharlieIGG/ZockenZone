import React from "react";

export interface ICanvasBoard {
  height: number;
  width: number;
}

export const GameArea = ({ height, width }: ICanvasBoard) => {
  return (
    <canvas
      style={{
        border: "3px solid black",
      }}
      height={height}
      width={width}
    />
  );
};