import React, {useEffect, useRef, useState} from 'react';
import './user.scss'
import {Link, NavLink, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/core";
import {repoType, UserType} from "../../redux/reducers/typs";
import {format} from "date-fns";
import {loadOneUser, loadUserRepos, setReposNumber} from "../../redux/reducers/usersReducer";
import {useLoadingMore} from "../../acces/functions";
import {Preloader} from "../accetComponent/Preloader/preloader";


const User = () => {
    let {id} = useParams();

    const user: UserType = useSelector((state: AppStateType) =>
        state.usersPage.users.filter((item: UserType) => {
        return (String(item.id) === id)
    }))[0]
    const localLoader = useSelector((state: AppStateType) => state.usersPage.loacalLoader)
    const loading = useSelector((state: AppStateType) => state.usersPage.loadingUsersPage)
    const repoItemsCount = useSelector((state: AppStateType) => state.usersPage.repoItemsCount)
    const repoItemsPage = useSelector((state: AppStateType) => state.usersPage.repoItemsPage)
    const [searchText, setSearchText]:[string,Function] = useState('');
    const dispatch = useDispatch()
    const myA = (e:any,href:any) => {
        e.preventDefault()
        let  tag = document.createElement("a");
        tag.href=href
        tag.target='_blank'
        tag.rel='noreferrer'
        document.body.appendChild(tag);
        tag.click()
    }
    useEffect(() => {
        if (!!user) {
            dispatch(loadUserRepos(String(user.userPage.login), String(id), searchText, repoItemsCount, repoItemsPage))
        }
    }, [user?.userPage])

    useEffect(() => {
        if (!user && id) {
            dispatch(loadOneUser(id, repoItemsCount, repoItemsPage))
        }
    }, [])

    const searchRef: { current: NodeJS.Timeout | null } = useRef(null);

    useEffect(() => {
        clearTimeout(searchRef.current as NodeJS.Timeout);
        searchRef.current = setTimeout(() => {
            if (!!user && !!id) {
                dispatch(loadUserRepos(user.login && user.login, id, searchText, repoItemsCount, repoItemsPage))
            }
        }, 1000);

    }, [searchText, repoItemsCount, repoItemsPage])
    useLoadingMore(user?.userRepos, loading, () => (dispatch(setReposNumber(repoItemsCount + 3))),)



    return (
        user
            ? <div className='userContainer'>
                <div className='topContainer'>
                    <div className='imgContainer'>
                        <img src={user.avatar_url} alt=""/>
                    </div>
                    <div className='info'>
                        {user.userPage.name && <div>Name: {user.userPage.name}</div>}
                        {user.userPage.login && <div>Login: {user.userPage.login}</div>}
                        {user.userPage.email && <div>Email: {user.userPage.email}</div>}
                        {user.userPage.location && <div>Location: {user.userPage.location}</div>}
                        {user.userPage.created_at &&
                        <div>Registration Date: {format(new Date(user.userPage.created_at), "dd.MM.yyyy  H:mm")}</div>}
                        {user.userPage.followers && <div>{user.userPage.followers} Followers</div>}
                        {user.userPage.following && <div>Following {user.userPage.following} </div>}
                        {user.userPage.bio && <div>Biography: {user.userPage.bio} </div>}
                        {user.userPage.email && <div>Email: {user.userPage.email} </div>}
                        {user.totalReposNumber && <div>Total repositories Numbers: {user.totalReposNumber} </div>}
                        {user.userRepos && <div>Visible repositories Numbers: {user.userRepos?.length} </div>}
                    </div>

                </div>
                <div className='tittle'>
                    <label htmlFor="searchInput">search by words:</label><br/>
                    <input
                        id='searchInput'
                        value={searchText}
                        className='searchInput'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            dispatch(String(setSearchText(e.target.value)))
                        }}
                        autoFocus={true} type="text"/>
                </div>
                <div className='tittle'>
                    <label htmlFor="numberRepos">Change numbers of repositories:</label>
                    <input
                        id='numberRepos'
                        value={repoItemsCount}
                        className='searchInput'
                        onChange={(e) => {
                            dispatch(setReposNumber(Number(e.target.value)))
                        }}
                        type="number"/>

                </div>
                <div >
                    {user.userRepos?.map((item: repoType) => {
                        return (
                            <a rel='noreferrer' target='_blank' key={item.id} href={item.html_url} className='repo'>
                                <div className="left">{item.name} </div>

                                <div className='center'>
                                    <span onClick={(e)=>myA(e,item.tryDeployUrl)}  id='innerATry'>try go to site</span>
                                    {item.deployUrl &&  <span onClick={(e)=>myA(e,item.deployUrl)}  id='innerA'> go to site</span>}
                                </div>

                                <div className="right">
                                    <div>{item.forks} Forks</div>
                                    <div>{item.stargazers_count} Stars</div>
                                </div>
                            </a>)
                    })}
                    <div style={{margin: '20px'}} id='loading'> </div>

                    {localLoader && <div className='preloader'><Preloader/></div>}

                </div>

            </div>
            : <div>user is not found</div>


    );
};

export default User;
