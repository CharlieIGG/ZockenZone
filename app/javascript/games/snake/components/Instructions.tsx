import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../store/reducers";

export const Instructions = () => {
    const dispatch = useDispatch();
    return (
        <div className="mt-3 card">
            <div className="card-body">
                <h6 className="card-title">How to Play</h6>
                <h5 className="mt-1">
                    NOTE: Start the game by pressing <kbd>d</kbd>
                </h5>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div>
                            <kbd>w / &uarr;</kbd> Move Up
                        </div>
                        <div>
                            <kbd>a / &larr;</kbd> Move Left
                        </div>
                        <div>
                            <kbd>s / &darr;</kbd> Move Down
                        </div>
                        <div>
                            <kbd>d / &rarr;</kbd> Move Right
                        </div>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary" onClick={() => dispatch(resetGame())}>
                            Reset game
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
