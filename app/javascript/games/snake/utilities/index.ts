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

export interface IObjectPosition {
    x: number;
    y: number;
}

export const drawObject = (
    context: CanvasRenderingContext2D | null,
    objectBody: IObjectPosition[],
    fillColor: string,
    strokeStyle = "#146356"
) => {
    if (context) {
        objectBody.forEach((object: IObjectPosition) => {
            context.fillStyle = fillColor;
            context.strokeStyle = strokeStyle;
            context?.fillRect(object.x, object.y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
            context?.strokeRect(object.x, object.y, SNAKE_SEGMENT_SIZE, SNAKE_SEGMENT_SIZE);
        });
    }
};

// generate a random starting position for the snake
export const generateRandomPosition = (): IObjectPosition => {
    const x = Math.floor(Math.random() * SNAKE_SEGMENT_SIZE) * SNAKE_SEGMENT_SIZE;
    const y = Math.floor(Math.random() * SNAKE_SEGMENT_SIZE) * SNAKE_SEGMENT_SIZE;
    return { x, y };
}

export const generateStartingSnake = (): IObjectPosition[] => {
    const startingSnake: IObjectPosition[] = [];
    for (let i = 0; i < 5; i++) {
        startingSnake.push({ x: CANVAS_WIDTH / 2 - i * SNAKE_SEGMENT_SIZE, y: CANVAS_HEIGHT / 2 });
    }
    return startingSnake;
}