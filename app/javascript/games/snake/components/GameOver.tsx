import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameState, resetGame } from "../store/reducers";
import { ICanvasBoard } from "./GameArea";

export const GameOver = ({ height, width }: ICanvasBoard) => {
    const dispatch = useDispatch();
    const score = useSelector((state: GameState) => state.score);
    const highScore = useSelector((state: GameState) => state.highScore);

    const handleKeyDown = (event: KeyboardEvent) => {
        console.log(event.key);
        if (["w", "W", "ArrowUp", "s", "S", "ArrowDown", "a", "A", "ArrowLeft", "d", "D", "ArrowRight", " "]
            .includes(event.key)) {
            dispatch(resetGame());
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center bg-dark text-white"
            style={{ height: `${height}px`, width: `${width}px` }}
            tabIndex={0}
        >
            <h1>Game Over</h1>
            <p>Your score: {score}</p>
            <p>Your highest score: {highScore}</p>
            <p>Press <kbd className="bg-light text-dark">space</kbd> or any direction key to play again</p>
        </div>
    );
};

export default GameOver;
