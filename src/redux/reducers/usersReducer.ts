import {userReposType, UserType} from "./typs";

export const SET_USERS = 'SET_USERS'
export const LOAD_USERS = 'LOAD_USERS'
export const CHANGE_LOADING_USERS_PAGE = 'CHANGE_LOADING_USERS_PAGE'

export const LOAD_USER_REPOS = 'LOAD_USER_REPOS'
export const SET_USER_REPOS = 'SET_USER_REPOS'

export const LOAD_ONE_USER = 'LOAD_ONE_USER'
export const SET_ONE_USER = 'SET_ONE_USER'

export const SET_SEARCH_USER_VALUE = 'SET_SEARCH_USER_VALUE'
export const SET_SEARCH_REPO_VALUE = 'SET_SEARCH_REPO_VALUE'

export const SET_USERS_NUMBER = 'SET_USERS_NUMBER'
export const SET_USERS_PAGE_NUMBER = 'SET_USERS_PAGE_NUMBER'

export const SET_REPOS_NUMBER = 'SET_REPOS_NUMBER'
export const SET_REPOS_PAGE_NUMBER = 'SET_REPOS_PAGE_NUMBER'
export const TOTAL_REPOS_NUMBER = 'TOTAL_REPOS_NUMBER'


export const SET_LOCAL_LOADER = 'SET_LOCAL_LOADER'

const initState = {
    users: [],
    searchUserValue: 'sasha',
    searchRepoValue: '',
    userItemsCount:10,
    userItemsPage: 0,
    repoItemsCount: 10,
    repoItemsPage: 0,
    loacalLoader: false,
    loadingUsersPage: true,
    total_count: 1 ,
    incomplete_results: true,
    totalReposNumber:1,
    user: {
        login: 'mojombo',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/mojombo',
        html_url: 'https://github.com/mojombo',
        followers_url: 'https://api.github.com/users/mojombo/followers',
        following_url: 'https://api.github.com/users/mojombo/following{/other_user}',
        gists_url: 'https://api.github.com/users/mojombo/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/mojombo/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
        organizations_url: 'https://api.github.com/users/mojombo/orgs',
        repos_url: 'https://api.github.com/users/mojombo/repos',
        events_url: 'https://api.github.com/users/mojombo/events{/privacy}',
        received_events_url: 'https://api.github.com/users/mojombo/received_events',
        type: 'User',
        site_admin: false
    },

}


const usersReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                total_count: action.total_count,
                incomplete_results: action.incomplete_results
            }
        case SET_ONE_USER:
            return {...state, users: [...state.users, action.oneUser]}
        case SET_USER_REPOS:
            return {
                ...state,
                users: [...state.users.map((user: UserType) => {
                    return (
                        String(user.id) !== String(action.id)
                            ? user
                            : {...user, userRepos: action.userRepos,
                                totalReposNumber:action.totalReposNumber}
                    )

                })]
            }
        case SET_SEARCH_USER_VALUE:
            return {...state, searchUserValue: action.value}
        case SET_USERS_NUMBER:
            return {...state, userItemsCount: action.value}
        case SET_USERS_PAGE_NUMBER:
            return {...state, userItemsPage: action.value}
        case SET_SEARCH_REPO_VALUE:
            return {...state, searchRepoValue: action.value}
        case CHANGE_LOADING_USERS_PAGE:
            return {
                ...state,
                loadingUsersPage: (typeof action.payload === 'boolean') ? action.payload : !state.loadingUsersPage
            }
        case SET_REPOS_NUMBER:
            return {...state,
                repoItemsCount: action.value}
        case SET_REPOS_PAGE_NUMBER:
            return {...state, repoItemsPage: action.value}
        case SET_LOCAL_LOADER:
            return {
                ...state,
                loacalLoader: (typeof action.payload === 'boolean') ? action.payload : !state.loacalLoader
            }
        case TOTAL_REPOS_NUMBER:
            return {...state,totalReposNumber:action.value}
        default :
            return state

    }
}

export const changeLoadingUsersPage = (payload: null | boolean = null) => ({type: CHANGE_LOADING_USERS_PAGE, payload})


export const loadUsers = (name: string, number: number = 10, page: number = 0) => ({
    type: LOAD_USERS,
    name,
    number,
    page
})
export const setUsers = (users: Array<UserType>, total_count: null | number = null, incomplete_results: boolean = true) => ({
    type: SET_USERS,
    users,
    total_count,
    incomplete_results
})

export const loadUserRepos = (name: string, id: string, repoName: string = '',count:number,page:number) => ({
    type: LOAD_USER_REPOS,
    name,
    id,
    repoName,
    count,
    page
})
export const setUserRepos = (userRepos: userReposType, id: string,totalReposNumber  :number=1) => ({type: SET_USER_REPOS, userRepos, id,totalReposNumber})

export const loadOneUser = (id: string,count:number,page:number) => ({type: LOAD_ONE_USER, id,count,page})
export const setOneUser = (oneUser: UserType,) => ({type: SET_ONE_USER, oneUser})

export const setSearchUserValue = (value: string) => ({type: SET_SEARCH_USER_VALUE, value})
export const setSearchRepoValue = (value: string) => ({type: SET_SEARCH_REPO_VALUE, value})


export const setUserNumber = (value: number) => ({type: SET_USERS_NUMBER, value})
export const setUserPageNumber = (value: number) => ({type: SET_USERS_PAGE_NUMBER, value})

export const setReposNumber = (value: number) => ({type: SET_REPOS_NUMBER, value})
export const setReposPageNumber = (value: number) => ({type: SET_REPOS_PAGE_NUMBER, value})

export const setLocalLoader = (payload: boolean | null = null) => ({type: SET_LOCAL_LOADER, payload})

export const setTotalReposNumber =(value:number)=>({type:TOTAL_REPOS_NUMBER,value})

export default usersReducer




