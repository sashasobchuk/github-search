import React from 'react';
import './users.scss'

// @ts-ignore
const   OneUser = ({oneUser}) => {
    console.log(oneUser)

    // debugger
    return (
        <div className='oneUser'>
            <img className='avatar' src={oneUser.avatar_url} alt="avatar"/>
            <div> {oneUser.login}</div>

        </div>
    );
};

export default OneUser;
