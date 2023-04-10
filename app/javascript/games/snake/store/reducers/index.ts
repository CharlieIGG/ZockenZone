import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_FOOD_VALUE, CANVAS_HEIGHT, CANVAS_WIDTH, generateRandomPosition, generateStartingSnake, SNAKE_SEGMENT_SIZE } from '../../utilities';

interface Coordinate {
    x: number;
    y: number;
}

export interface GameState {
    snake: Coordinate[];
    food: Coordinate;
    direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
    gameOver: boolean;
    score: number;
    highScore: number;
}

const initialState: GameState = {
    snake: generateStartingSnake(),
    food: generateRandomPosition(),
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    highScore: localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore') as string) : 0,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        moveSnake: (state) => {
            const { snake, direction, food } = state;
            const head = snake[0];

            let newHead: Coordinate = head;
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

const generateNewFood = (snake: Coordinate[]) => {
    let food: Coordinate;

    // Generate random coordinates for the food
    do {
        food = generateRandomPosition()
    } while (snake.some((part) => part.x === food.x && part.y === food.y));

    return food;
};

export const { moveSnake, changeDirection, resetGame } = gameSlice.actions;
export default gameSlice.reducer;