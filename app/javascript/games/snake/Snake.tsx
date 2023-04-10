import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import { GameArea } from "./components/GameArea";
import { createRoot } from "react-dom/client";

const Snake = () => {
  return (
    <Provider store={store}>
      <div className="container-lg text-center">
        <h1 className="mt-5">SNAKE GAME</h1>
        <GameArea height={600} width={600} />
      </div>
    </Provider>
  );
};

// create a div and render Snake, using createRoot
const div = document.getElementById("snake");
div && createRoot(div).render(<Snake />);