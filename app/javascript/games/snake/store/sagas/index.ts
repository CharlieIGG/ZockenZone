import { put, takeEvery, select } from 'redux-saga/effects';
import { RootState } from '../index';
import { moveSnake, resetGame } from '../reducers';
import { BASE_SPEED } from '../../utilities';

function* moveSnakeSaga(state): Generator<any, any, any> {

    const gameOver: ReturnType<typeof selectGameOver> = yield select(selectGameOver);
    const score: ReturnType<typeof selectScore> = yield select(selectScore);

    if (gameOver) {
        yield put(resetGame());
    } else {
        const speedBonus = 1 + (score) / 750;
        yield delay(BASE_SPEED / speedBonus);
        yield put(moveSnake());
    }
}

export default function* gameSaga() {
    yield takeEvery(moveSnake.type, moveSnakeSaga);
}

const selectScore = (state: RootState) => state.score;
const selectGameOver = (state: RootState) => state.gameOver;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
