import {takeEvery, put, call} from 'redux-saga/effects'
import {
     LOAD_ONE_USER,
    LOAD_USER_REPOS,
    LOAD_USERS,
    SET_USER_REPOS,
    SET_ONE_USER,
    changeLoadingUsersPage,
    setLocalLoader,
    setOneUser,
    setUserRepos,
    setUsers,
} from "../reducers/usersReducer";
import {findUsers, getOneUser, getUserPage, getUserRepos} from "../../api/usersApi";
import {errorReporte} from "../../acces/functions";
import {repoType} from "../reducers/typs";


function* setItemsPages(items: Array<any>): any {
    let iterate = 0
    while (items.length > iterate) {
        try {
            let userPage = yield call(getUserPage, items[iterate].url)
            items[iterate].userPage = userPage.data
        } catch (e) {
            console.log(e)
            yield undefined
        } finally {
            iterate++
        }
    }
    return items
}


export function* watchLoadUsers() {
    yield takeEvery(LOAD_USERS, workerLoadUsers);
}

function* workerLoadUsers(payload: { name: string,number:number,page:number, type: 'LOAD_USERS' }): any {
    // yield  put(changeLoadingUsersPage(true))
    let response
    let items
    let total_count
    let incomplete_results
    if(!payload.name.length){
        yield  put(changeLoadingUsersPage(false))
        return
    }
    response = yield call(findUsers, payload.name,payload.number,payload.page)
    items = response.data.items;
    total_count = response.data.total_count
    incomplete_results = response.data.incomplete_results
    items = yield setItemsPages(items)

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
        yield put(setLocalLoader(false))

    }
    return null
}


export function* watchLoadUserRepos() {
    yield takeEvery(LOAD_USER_REPOS, workerLoadUserRepos);
}
function makeSiteLink(repos:Array<repoType>,) {
    debugger
    repos.map((repo:repoType)=>{
        if(repo.default_branch === 'gh-pages') {
            let  [userName,repoName] = repo.full_name.split('/')
            repo.deployUrl = `https://${userName}.github.io/${repoName}`
        }else {
            let  [userName,repoName] = repo.full_name.split('/')
            repo.tryDeployUrl = `https://${userName}.github.io/${repoName}`
        }
        return repo
    })
    return repos
}

function* workerLoadUserRepos(payload: { name: string, repoName: string, id: string, type: typeof SET_USER_REPOS,count:number,page:number }): any {
    // yield  put(changeLoadingUsersPage(true))
    let response = yield call(getUserRepos, payload.name, payload.repoName,payload.count,payload.page)
    if (response && response.status === 200) {
        const userRepos = yield makeSiteLink(response.data.items)
        yield put(setUserRepos(userRepos, payload.id,response.data.total_count))
    }
    yield  put(changeLoadingUsersPage(false))
    yield put(setLocalLoader(false))
}

export function* watchLoadOneUser() {
    yield takeEvery(LOAD_ONE_USER, workerLoadOneUser);
}

function* workerLoadOneUser(payload: { id: string, type: typeof SET_ONE_USER ,count:number,page:number}): any {
    yield  put(changeLoadingUsersPage(true))
    let response = yield call(getOneUser, payload.id)
    let userPage = response.data
    response = yield call(getUserRepos, userPage.login, '',payload.count,payload.page)
    if (response && response.status === 200) {
        let userItem = {
            login: userPage.login,
            id: userPage.id,
            node_id: userPage.node_id,
            avatar_url: userPage.avatar_url,
            gravatar_id: userPage.gravatar_id,
            url: userPage.url,
            html_url: userPage.html_url,
            followers_url: userPage.followers_url,
            following_url: userPage.following_url,
            gists_url: userPage.gists_url,
            starred_url: userPage.starred_url,
            subscriptions_url: userPage.subscriptions_url,
            organizations_url: userPage.organizations_url,
            repos_url: userPage.repos_url,
            events_url: userPage.events_url,
            received_events_url: userPage.received_events_url,
            type: userPage.type,
            site_admin: userPage.site_admin,
            score: userPage.score,
            userPage: userPage,
            userRepos: response.data.items,
            totalReposNumber: response.data.total_count
        }
        yield put(setOneUser(userItem))
    }
    yield  put(changeLoadingUsersPage(false))
}

















