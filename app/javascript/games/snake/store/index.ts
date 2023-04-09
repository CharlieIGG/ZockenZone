import createSagaMiddleware from "redux-saga";
import gameReducer from "./reducers";
import watcherSagas from "./sagas";
import { configureStore } from "@reduxjs/toolkit";
const sagaMiddleware = createSagaMiddleware();

// const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));
const store = configureStore({
    reducer: gameReducer,
    middleware: [sagaMiddleware]
}
)
sagaMiddleware.run(watcherSagas);
export default store;
export type RootState = ReturnType<typeof store.getState>
