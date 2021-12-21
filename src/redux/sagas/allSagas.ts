import {all} from 'redux-saga/effects'
import { watchLoadData} from "./usersSaga";
// import {watchLoadData} from "./sagas";
// import {watchAddItems, WathdeleteItems} from "./SagaCrement";
// import {sagaMiddleware} from "./redux";



export function* allWatchers() {
    yield all([watchLoadData()])
}

