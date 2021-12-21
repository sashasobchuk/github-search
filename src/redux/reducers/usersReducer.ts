export const SET_USERS = 'SET_USERS'
export const LOAD_USERS = 'LOAD_USERS'
export const CHANGE_LOADING_USERS_PAGE = 'CHANGE_LOADING_USERS_PAGE'


const initState = {
    users: [],
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
    loadingUsersPage: true,
    total_count:null,
    incomplete_results:true
}


const usersReducer = (state = initState, action: any) => {
    switch (action.type) {
        default :
            return state
        case SET_USERS:
            return {...state, users: action.users,total_count:action.total_count,incomplete_results:action.incomplete_results}
        case CHANGE_LOADING_USERS_PAGE:
            return {...state, loadingUsersPage:(typeof action.payload === 'boolean') ? action.payload :  !state.loadingUsersPage}


    }
}

export const changeLoadingUsersPage = (payload: null | boolean = null) => ({type: CHANGE_LOADING_USERS_PAGE,payload})


export const loadUsers = (name: string  ) => ({type: LOAD_USERS, name})
export const setUsers = (users: any,total_count:null |number = null,incomplete_results:boolean=true) => ({type: SET_USERS, users,total_count,incomplete_results})


export default usersReducer




