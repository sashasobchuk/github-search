import {takeEvery, put, call, all} from 'redux-saga/effects'
import {changeLoadingUsersPage, LOAD_USERS, setUsers} from "../reducers/usersReducer";
import {findUsers, getUserPage, getUsers} from "../../api/usersApi";
import {errorReporte} from "../../acces/functions";


export function* watchLoadData() {
    yield takeEvery(LOAD_USERS, workerLoadUsers);
}

function* setItemsPages(items: Array<any>): any {
    let iterate = 0
    let newItems: Array<any> = []

    while (items.length > iterate) {
        try {
            let userPage = yield call(getUserPage, items[iterate].url)
            // items[iterate].userPage = userPage.data
            let newItem = {...items[iterate], userPage:userPage.data}
            newItems.push(newItem)
            iterate++

            // debugger
            // yield
        } catch (e) {
            console.log(e)
            yield undefined
        }
    }
    console.log(items)
    // debugger

    return newItems
}

function* workerLoadUsers(payload: { name: string, type: "LOAD_USERS" }): any {
    yield  put(changeLoadingUsersPage(true))
    let response
    let items
    let total_count
    let incomplete_results
    if (payload.name.length === 0) {
        response = yield call(getUsers, payload.name)
        items = response.data
    }
        // else {
        //     response = yield call(findUsers, payload.name)
        //     items = response.data.items;
        //     total_count = response.data.total_count
        //     incomplete_results = response.data.incomplete_results
        //
        //
        //     yield all(items.map((item: any) => {
        //         let newItem = {...item, itemPage :  call(getUserPage, item.url)}
        //
        //         debugger
        //
        //         return ({...item, itemPage :  call(getUserPage, item.url)})
        //     }))
        //
        // // console.log(items[0])
        // //     debugger
    // }
    else {
        response = yield call(findUsers, payload.name)
        items = response.data.items;
        total_count = response.data.total_count
        incomplete_results = response.data.incomplete_results

        items = yield setItemsPages(items)
    }
    try {
        if (response.status === 200) {
            yield put(setUsers(items, total_count, incomplete_results))
        } else {
            errorReporte('error in workerLoadUsers')
        }
    } catch (e) {
        console.log(e)
    } finally {
        yield  put(changeLoadingUsersPage(false))

    }
    return null
}


