import { put, takeEvery, select } from 'redux-saga/effects';
import { moveSnake, resetGame } from '../actions';
import { RootState } from '../index';

function* moveSnakeSaga(): Generator<any, any, any> {
    const direction: ReturnType<typeof selectDirection> = yield select(selectDirection);
    yield put(moveSnake());

    const gameOver: ReturnType<typeof selectGameOver> = yield select(selectGameOver);
    if (gameOver) {
        yield put(resetGame());
    } else {
        yield delay(100);
        yield moveSnakeSaga();
    }
}

export default function* gameSaga() {
    yield takeEvery(moveSnake.type, moveSnakeSaga);
}

const selectDirection = (state: RootState) => state.direction;
const selectGameOver = (state: RootState) => state.gameOver;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
