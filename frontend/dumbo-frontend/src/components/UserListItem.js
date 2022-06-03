import React from 'react'
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const UserListItem = (props) => {

    const { user } = props;
    const { username, displayName, profileImage } = user;


    return (
        <Link to={`/user/${username}`}
            className="list-group-item list-group-item-action">
            <ProfileImageWithDefault className='rounded-circle' width="32" height="32" alt={`${username} profile`} profileimage={profileImage} />
            <span className="ps-2">
                @{username}
                <span className="fw-light ps-2">
                    {displayName}
                </span>
            </span>
        </Link>
    );
};

export default UserListItem;
