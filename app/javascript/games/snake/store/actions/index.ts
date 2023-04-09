import { createAction } from '@reduxjs/toolkit';

export const setDirection = createAction<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('game/setDirection');

export const moveSnake = createAction('game/moveSnake');

export const resetGame = createAction('game/resetGame');

export const setGameOver = createAction<boolean>('game/setGameOver');