import { put, takeEvery, select, delay } from 'redux-saga/effects';
import { RootState } from '../index';
import { moveSnake, resetGame } from '../reducers';
import { BASE_SPEED } from '../../utilities';

function* moveSnakeSaga(): Generator<any, any, any> {

    const gameOver: ReturnType<typeof selectGameOver> = yield select(selectGameOver);
    const score: ReturnType<typeof selectScore> = yield select(selectScore);

    if (gameOver) {
        return;
    } else {
        const speedBonus = 1 + (score) / 750;
        const delayTime = BASE_SPEED / speedBonus
        yield delay(delayTime);
        yield put(moveSnake(delayTime));
    }
}

export default function* gameSaga() {
    yield takeEvery(moveSnake.type, moveSnakeSaga);
}

const selectScore = (state: RootState) => state.score;
const selectGameOver = (state: RootState) => state.gameOver;

