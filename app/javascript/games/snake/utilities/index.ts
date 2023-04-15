export const SNAKE_SEGMENT_SIZE = 20;
export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 600;
export const BASE_SPEED = 100;
export const BASE_FOOD_VALUE = 20;
export const DEFAULT_FOOD_DURATION = 7500;

if (CANVAS_WIDTH % SNAKE_SEGMENT_SIZE !== 0 || CANVAS_HEIGHT % SNAKE_SEGMENT_SIZE !== 0) {
    console.warn("Your canvas size and snake segment size are not compatible");
}

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

export interface ICoordinate {
    x: number;
    y: number;
}

export type TFoodType = 'apple' | 'blueberry' | 'banana';

export interface IFood extends ICoordinate {
    type: TFoodType;
    color: string;
    timeLeft: number;
    probability: number;
}

type TAvailableFoods = { [key in TFoodType]: IFood };

export const FOODS: TAvailableFoods = {
    apple: {
        type: "apple",
        probability: 0.5,
        color: "red",
        timeLeft: DEFAULT_FOOD_DURATION,
        x: 0,
        y: 0
    },
    blueberry: {
        type: "blueberry",
        probability: 0.3,
        color: "blue",
        timeLeft: DEFAULT_FOOD_DURATION,
        x: 0,
        y: 0
    },
    banana: {
        type: "banana",
        probability: 0.2,
        color: "yellow",
        timeLeft: DEFAULT_FOOD_DURATION,
        x: 0,
        y: 0
    },
}

export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: ICoordinate[],
    fillColor: string,
    strokeStyle = "#146356"
) => {
    if (context) {
        objectBody.forEach((object: ICoordinate) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
            context?.strokeRect(object.x, object.y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
        });
    }
};

export const drawFood = (context: CanvasRenderingContext2D | null, food: IFood) => {
    if (!context) return;

    const { x, y, timeLeft } = food;

    // calculate the blink interval based on the timeLeft
    const blinkInterval = timeLeft <= 5000 ? timeLeft / 100 : null;

    // set the fruit color based on the type and blink interval
    const fillColor = blinkInterval && Math.floor(Date.now() / blinkInterval) % 2 === 0 ? 'white' : food.color;
    drawObject(context, [{ x, y }], fillColor);
}

// generate a random starting position for the snake
export const generateRandomPosition = (): ICoordinate => {
    const x = Math.floor(Math.random() * SNAKE_SEGMENT_SIZE) * SNAKE_SEGMENT_SIZE;
    const y = Math.floor(Math.random() * SNAKE_SEGMENT_SIZE) * SNAKE_SEGMENT_SIZE;
    return { x, y };
}

export const generateStartingSnake = (): ICoordinate[] => {
    const startingSnake: ICoordinate[] = [];
    for (let i = 0; i < 5; i++) {
        startingSnake.push({ x: CANVAS_WIDTH / 2 - i * SNAKE_SEGMENT_SIZE, y: CANVAS_HEIGHT / 2 });
    }
    return startingSnake;
}

export const generateNewFood = (snake: ICoordinate[]) => {
    let food: IFood;
    const foodTypes = Object.keys(FOODS) as TFoodType[];
    const newFoodType = foodTypes.reduce((acc, food) => {
        const probability = FOODS[food].probability;
        return Math.random() < probability ? food : acc;
    }, foodTypes[0]);
    // Generate random coordinates for the food
    const newFoodBase = FOODS[newFoodType]
    do {
        food = { ...newFoodBase, ...generateRandomPosition() };
    } while (snake.some((part) => part.x === food.x && part.y === food.y));

    return food;
};

