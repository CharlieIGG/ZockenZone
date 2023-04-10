// React component that uses a bootstrap CSS card to display the score and high score
// it uses RTK to access the score and high score from the store

import React from 'react';
import { useSelector } from 'react-redux';
import { GameState } from '../store/reducers';

export const ScoreBoard = () => {
    const score = useSelector((state: GameState) => state.score);
    const highScore = useSelector((state: GameState) => state.highScore);

    return (
        <div className="container">
            <div className="row mb-3">
                <div className=" d-flex justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Score</h5>
                            <p className="card-text mb-0">Score: {score}</p>
                            <p className="card-text">High Score: {highScore}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
