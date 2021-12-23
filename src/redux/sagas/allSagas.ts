import {all} from 'redux-saga/effects'
import {watchLoadOneUser, watchLoadUserRepos, watchLoadUsers} from "./usersSaga";



export function* allWatchers() {
    yield all([watchLoadUsers(),watchLoadUserRepos(),watchLoadOneUser()])
}

