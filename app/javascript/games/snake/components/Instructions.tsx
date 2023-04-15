import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../store/reducers";

export const Instructions = () => {
    const dispatch = useDispatch();
    return (
        <div className="mt-3 card">
            <div className="card-body">
                <h6 className="card-title">How to Play</h6>
                <h5 className="m-3">
                    Start the game by pressing <kbd>d</kbd> or <kbd>&rarr;</kbd>
                </h5>
                <div className="row mt-3">
                    <div className="col-md-6 d-flex flex-column align-items-start">
                        <div>
                            <kbd>w / &uarr;</kbd> <span className="ms-2">Move Up</span>
                        </div>
                        <div>
                            <kbd>a / &larr;</kbd> <span className="ms-2">Move Left</span>
                        </div>
                        <div>
                            <kbd>s / &darr;</kbd> <span className="ms-2">Move Down</span>
                        </div>
                        <div>
                            <kbd>d / &rarr;</kbd> <span className="ms-2">Move Right</span>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <button className="btn btn-primary" onClick={() => dispatch(resetGame())}>
                            Reset game
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
