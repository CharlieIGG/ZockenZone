import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coordinate {
    x: number;
    y: number;
}

export interface GameState {
    snake: Coordinate[];
    food: Coordinate;
    direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
    gameOver: boolean;
}

const initialState: GameState = {
    snake: [
        { x: 580, y: 300 },
        { x: 560, y: 300 },
        { x: 540, y: 300 },
        { x: 520, y: 300 },
        { x: 500, y: 300 },
    ],
    food: { x: 10, y: 10 },
    direction: 'RIGHT',
    gameOver: false,
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
                newHead = { x: head.x, y: head.y - 1 };
            } else if (direction === 'RIGHT') {
                newHead = { x: head.x + 1, y: head.y };
            } else if (direction === 'DOWN') {
                newHead = { x: head.x, y: head.y + 1 };
            } else if (direction === 'LEFT') {
                newHead = { x: head.x - 1, y: head.y };
            }

            // Check if snake has collided with the walls
            if (
                newHead.x < 0 ||
                newHead.x >= 20 ||
                newHead.y < 0 ||
                newHead.y >= 20
            ) {
                state.gameOver = true;
            }

            // Check if snake has collided with itself
            if (snake.some((part) => part.x === newHead.x && part.y === newHead.y)) {
                state.gameOver = true;
            }

            // Check if snake has eaten the food
            if (newHead.x === food.x && newHead.y === food.y) {
                state.food = generateNewFood(snake);
            } else {
                snake.pop();
            }

            snake.unshift(newHead);
        },

        changeDirection: (state, action: PayloadAction<{ direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT' }>) => {
            const { direction } = action.payload;
            const { snake } = state;
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

        resetGame: () => {
            return initialState;
        },
    },
});

const generateNewFood = (snake: Coordinate[]) => {
    let food: Coordinate;

    // Generate random coordinates for the food
    do {
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
        };
    } while (snake.some((part) => part.x === food.x && part.y === food.y));

    return food;
};

export const { moveSnake, changeDirection, resetGame } = gameSlice.actions;
export default gameSlice.reducer;