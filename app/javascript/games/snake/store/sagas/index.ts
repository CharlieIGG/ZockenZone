import { put, takeEvery, select } from 'redux-saga/effects';
import { RootState } from '../index';
import { moveSnake, resetGame } from '../reducers';

function* moveSnakeSaga(): Generator<any, any, any> {

    const gameOver: ReturnType<typeof selectGameOver> = yield select(selectGameOver);

    if (gameOver) {
        yield put(resetGame());
    } else {
        yield delay(100);
        yield put(moveSnake());
    }
}

export default function* gameSaga() {
    yield takeEvery(moveSnake.type, moveSnakeSaga);
}

const selectDirection = (state: RootState) => state.direction;
const selectGameOver = (state: RootState) => state.gameOver;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
