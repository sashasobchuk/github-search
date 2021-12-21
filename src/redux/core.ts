
import {applyMiddleware, combineReducers, createStore} from "redux";

import createSagaMiddleware from "redux-saga"
import {allWatchers} from "./sagas/allSagas";
import {composeWithDevTools} from "redux-devtools-extension";
import usersReducer from "./reducers/usersReducer";

export const sagaMiddleware = createSagaMiddleware()



const rootReducer = combineReducers({
    usersPage:usersReducer
    // counter:countReducer,
    // crementor:crementorReducer
})
type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>


export const store  = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(allWatchers)

