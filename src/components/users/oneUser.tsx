import React from 'react';
import './users.scss'
import {UserType} from "../../redux/reducers/typs";

const   OneUser = ({oneUser}:{oneUser:UserType}) => {
    return (
        <div className='oneUser'>
            <div className='left'>
                <img className='avatar' src={oneUser.avatar_url} alt="avatar"/>
                <div className='login'>{oneUser.login}</div>
            </div>
            <div className='rigth'>
                <div className='repos'>Repo: {oneUser.userPage?.public_repos}</div>
            </div>


        </div>
    );
};

export default OneUser;
