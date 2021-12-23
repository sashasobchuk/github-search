import React, {useEffect, useRef} from 'react';
import './users.scss'
import OneUser from "./oneUser";
import {
    changeLoadingUsersPage,
    loadUsers,
    setLocalLoader,
    setSearchUserValue,
    setUserNumber
} from "../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "../../redux/core";
import {NavLink} from "react-router-dom";
import {Preloader} from "../accetComponent/Preloader/preloader";
import {useLoadingMore} from "../../acces/functions";


const Users = () => {
    const dispatch = useDispatch()
    const searchUserValue = useSelector((state: AppStateType) => state.usersPage.searchUserValue)
    const users = useSelector((state: AppStateType) => state.usersPage.users)
    const total_count = useSelector((state: AppStateType) => state.usersPage.total_count)
    const loading = useSelector((state: AppStateType) => state.usersPage.loadingUsersPage)
    const {userItemsCount, userItemsPage} = useSelector((state: AppStateType) => state.usersPage)

    const searchRef: { current: NodeJS.Timeout | null } = useRef(null);

    const changeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchUserValue(e.target.value))
    }
    const userItemsCountRef = useRef()
    const localLoader = useSelector((state: AppStateType) => state.usersPage.loacalLoader)
    useEffect(() => {
        userItemsCountRef.current = userItemsCount
        clearTimeout(searchRef.current as NodeJS.Timeout);
        searchRef.current = setTimeout(() => {
            if (userItemsCountRef.current !== userItemsCount) {
                dispatch(changeLoadingUsersPage(true))
            } else {
                dispatch(setLocalLoader(true))
            }
            dispatch(loadUsers(searchUserValue, userItemsCount, userItemsPage))
        }, 900);

    }, [searchUserValue, userItemsCount])


    useLoadingMore(users, loading, () => {
        return dispatch(setUserNumber(userItemsCount + 3))
    })

    return (
        <div className='users'>
            <div className='contentContainer'>
                <input
                    autoFocus={true}
                    className='searchInput'
                    placeholder='sashaSobchuk'
                    onChange={changeSearchString}
                    value={searchUserValue}
                />
                {(!loading)
                        ? <div className='usersContainer'>
                            <div style={{fontSize:'20px'}}>Total counts :{total_count}</div>
                            <label htmlFor='number' style={{fontSize:'20px'}}>Max total count on page:{userItemsCount}</label>
                            <input id='number'
                                   onChange={e=>{dispatch(setUserNumber(Number(e.target.value)))}}
                                   value={userItemsCount} type='number' className='searchInput'
                                   placeholder='Change max total count on page' />
                            {users.length && users.map((oneUser: any, ) => {
                                return (
                                    <NavLink className='oneUserContainer' key={oneUser.id}
                                             to={`user/${oneUser.id}`}>
                                        <OneUser oneUser={oneUser}/>
                                    </NavLink>
                                )
                            })}
                            {localLoader && <div className='preloader'><Preloader/></div>}

                            <div style={{margin: '20px'}} id='loading'> </div>
                        </div>
                        : <div className='preloader'><Preloader/></div>
                }
            </div>

        </div>
    );
};

export default Users;
