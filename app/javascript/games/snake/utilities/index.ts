export const SNAKE_SEGMENT_SIZE = 20;
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 600;
export const BASE_SPEED = 100;
export const BASE_FOOD_VALUE = 20;

if (CANVAS_WIDTH % SNAKE_SEGMENT_SIZE !== 0 || CANVAS_HEIGHT % SNAKE_SEGMENT_SIZE !== 0) {
    console.warn("Your canvas size and snake segment size are not compatible");
}

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

export interface Coordinate {
    x: number;
    y: number;
}

export const FOODS = Object.freeze({
    apple: {
        probability: 0.5,
        color: "red"
    },
    blueberry: {
        probability: 0.3,
        color: "blue"
    },
    banana: {
        probability: 0.2,
        color: "yellow"
    },
})

export type FoodType = keyof typeof FOODS;

export interface Food extends Coordinate {
    type: FoodType;
    color: string;
}


export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: Coordinate[],
    fillColor: string,
    strokeStyle = "#146356"
) => {
    if (context) {
        objectBody.forEach((object: Coordinate) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
            context?.strokeRect(object.x, object.y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
        });
    }
};

// generate a random starting position for the snake
export const generateRandomPosition = (): Coordinate => {
    const x = Math.floor(Math.random() * SNAKE_SEGMENT_SIZE) * SNAKE_SEGMENT_SIZE;
    const y = Math.floor(Math.random() * SNAKE_SEGMENT_SIZE) * SNAKE_SEGMENT_SIZE;
    return { x, y };
}

export const generateStartingSnake = (): Coordinate[] => {
    const startingSnake: Coordinate[] = [];
    for (let i = 0; i < 5; i++) {
        startingSnake.push({ x: CANVAS_WIDTH / 2 - i * SNAKE_SEGMENT_SIZE, y: CANVAS_HEIGHT / 2 });
    }
    return startingSnake;
}

export const generateNewFood = (snake: Coordinate[]) => {
    let food: Food;
    const foodTypes = Object.keys(FOODS) as FoodType[];
    const newFoodType = foodTypes.reduce((acc, food) => {
        const probability = FOODS[food].probability;
        return Math.random() < probability ? food : acc;
    }, foodTypes[0]);
    // Generate random coordinates for the food
    do {
        food = { type: newFoodType, color: FOODS[newFoodType].color, x: 0, y: 0 };
        food = Object.assign(food, generateRandomPosition());
    } while (snake.some((part) => part.x === food.x && part.y === food.y));

    return food;
};

