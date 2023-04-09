export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
        context.clearRect(0, 0, 1000, 600);
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
            context?.fillRect(object.x, object.y, 20, 20);
            context?.strokeRect(object.x, object.y, 20, 20);
        });
    }
};

// generate a random starting position for the snake
export const generateRandomPosition = (): IObjectPosition => {
    const x = Math.floor(Math.random() * 20) * 20;
    const y = Math.floor(Math.random() * 20) * 20;
    return { x, y };
}