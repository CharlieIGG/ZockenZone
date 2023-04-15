import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_FOOD_VALUE, CANVAS_HEIGHT, CANVAS_WIDTH, ICoordinate, IFood, generateNewFood, generateStartingSnake, SNAKE_SEGMENT_SIZE } from '../../utilities';

export interface GameState {
    snake: ICoordinate[];
    food: IFood;
    direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
    gameOver: boolean;
    score: number;
    highScore: number;
}

const initiatlSnake = generateStartingSnake();

const initialState: GameState = {
    snake: initiatlSnake,
    food: generateNewFood(initiatlSnake),
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    highScore: localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore') as string) : 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        spawnFruit: (state) => {
            state.food = generateNewFood(state.snake);
        },
        moveSnake: (state, action: PayloadAction<number>) => {
            const { snake, direction, food } = state;
            food.timeLeft -= action.payload;
            const head = snake[0];

            let newHead: ICoordinate = head;
            if (direction === 'UP') {
                newHead = { x: head.x, y: head.y - SNAKE_SEGMENT_SIZE };
            } else if (direction === 'RIGHT') {
                newHead = { x: head.x + SNAKE_SEGMENT_SIZE, y: head.y };
            } else if (direction === 'DOWN') {
                newHead = { x: head.x, y: head.y + SNAKE_SEGMENT_SIZE };
            } else if (direction === 'LEFT') {
                newHead = { x: head.x - SNAKE_SEGMENT_SIZE, y: head.y };
            }

            // Check if snake has collided with the walls
            if (
                newHead.x < 0 ||
                newHead.x >= CANVAS_WIDTH ||
                newHead.y < 0 ||
                newHead.y >= CANVAS_HEIGHT
            ) {
                state.gameOver = true;
            }

            // Check if snake has collided with itself
            if (snake.some((part) => part.x === newHead.x && part.y === newHead.y)) {
                state.gameOver = true;
            }

            // Check if snake has eaten the food
            if (newHead.x === food.x && newHead.y === food.y) {
                state.score += BASE_FOOD_VALUE
                state.food = generateNewFood(snake);
            } else {
                snake.pop();
            }

            snake.unshift(newHead);
        },

        changeDirection: (state, action: PayloadAction<{ direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT' }>) => {
            const { direction } = action.payload;
            const oppositeDirection: { [key in 'UP' | 'RIGHT' | 'DOWN' | 'LEFT']: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT' } = {
                UP: 'DOWN',
                RIGHT: 'LEFT',
                DOWN: 'UP',
                LEFT: 'RIGHT',
            };

            // Check if new direction is opposite of current direction
            if (oppositeDirection[direction] !== state.direction) {
                state.direction = direction;
            }
        },

        resetGame: (state) => {
            let highScore = state.highScore
            console.log(highScore, state.score)
            if (state.score > highScore) {
                highScore = state.score;
                localStorage.setItem('highScore', state.score.toString());
            }
            return Object.assign({}, initialState, { highScore: highScore });
        },
    },
});

export const { moveSnake, changeDirection, resetGame, spawnFruit } = gameSlice.actions;
export default gameSlice.reducer;