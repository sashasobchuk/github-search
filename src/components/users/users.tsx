import React, {useEffect, useRef, useState} from 'react';
import './users.scss'
import OneUser from "./oneUser";
import {getUsers} from "../../api/usersApi";
import {loadUsers} from "../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from "../../redux/core";
// import {useDispatch} from "react-redux";


const Users = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('sasha')
    const users = useSelector((state: AppStateType) => state.usersPage.users)
    const loading = useSelector((state: AppStateType) => state.usersPage.loadingUsersPage)

    const searchRef: { current: NodeJS.Timeout | null } = useRef(null);


    const changeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }


    useEffect(() => {
        clearTimeout(searchRef.current as NodeJS.Timeout);
        searchRef.current = setTimeout(() => {
            dispatch(loadUsers(searchValue))
            // dispatch(loadUsers(searchValue))
        }, 1000);

    }, [searchValue.length])

    useEffect(() => {

    }, [])

    return loading
        ? <div>loader</div>
        : (
            <div className='users'>
                <h1 className='tittle'>First Screen </h1>
                <div className='contentContainer'>
                    <h2>gitHub Searcher</h2>
                    <input
                            className='searchInput'
                        placeholder='Search for Users'
                           onChange={changeSearchString}
                           value={searchValue}
                    />

                    <div className='usersContainer'>
                        {users.length && users.map((oneUser: any, index: number) => {
                            return (
                                <div className='oneUserContainer' key={index}>

                                    <OneUser oneUser={oneUser} />

                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        );
};

export default Users;
