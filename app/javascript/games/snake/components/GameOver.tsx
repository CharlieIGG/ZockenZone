import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameState, resetGame } from "../store/reducers";

interface GameOverProps {
    score: number;
}

export const GameOver = () => {
    const dispatch = useDispatch();
    const score = useSelector((state: GameState) => state.score);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(event.key);
        if (["w", "W", "ArrowUp", "s", "S", "ArrowDown", "a", "A", "ArrowLeft", "d", "D", "ArrowRight"]
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
            className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white"
            tabIndex={0}
        >
            <h1>Game Over</h1>
            <p>Your score: {score}</p>
            <p>Press any direction key to play again</p>
        </div>
    );
};

export default GameOver;
