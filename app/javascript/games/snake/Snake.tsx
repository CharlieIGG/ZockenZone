import { Provider, useSelector } from "react-redux";
import store from "./store";
import React from "react";
import { GameArea } from "./components/GameArea";
import { createRoot } from "react-dom/client";
import { ScoreBoard } from "./components/ScoreBoard";
import { Instructions } from "./components/Instructions";
import GameOver from "./components/GameOver";
import { GameState } from "./store/reducers";

const SnakeComponents = () => {
  const gameOver = useSelector((state: GameState) => state.gameOver);
  return (
    <div className="row mt-5">
      <div className="col">
        {gameOver ? <GameOver height={600} width={600} /> : <GameArea height={600} width={600} />}
      </div>
      <div className="col d-flex justify-content-center flex-column">
        <ScoreBoard />
        <Instructions />
      </div>
    </div>
  )
}

const Snake = () => {
  return (
    <Provider store={store}>
      <div className="container-lg text-center">
        <h1 className="mt-5">SNAKE GAME</h1>
        <SnakeComponents />
      </div>
    </Provider>
  );
};

// create a div and render Snake, using createRoot
const div = document.getElementById("snake");
div && createRoot(div).render(<Snake />);