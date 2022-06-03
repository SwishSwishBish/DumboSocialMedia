import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../api/apiCalls'
import UserListItem from './UserListItem';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const UserList = () => {
    const { t } = useTranslation();

    const [page, setPage] = useState({
        content: [],
        size: 4,
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

    useEffect(() => {
        loadUsers();
    }, []);

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    };

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = async page => {
        setLoadFailure(false);
        try {
            const response = await getAllUsers(page);
            setPage(response.data);
        } catch (error) {
            setLoadFailure(true);
        }
    };

    const { content: users, first, last } = page;

    let actionDiv = (
        <ul className="pagination justify-content-center m-2">
            {first === true && (<li className="page-item disabled">
                <span className="page-link" to="" aria-hidden="true">&laquo;</span>
            </li>)}
            {first === false && (<li className="page-item">
                <Link className="page-link" to="" aria-hidden="true" onClick={onClickPrevious}>
                    &laquo;
                </Link>
            </li>)}
            {last === false && (<li className="page-item">
                <Link className="page-link" to="" aria-hidden="true" onClick={onClickNext}>
                    &raquo;
                </Link>
            </li>)}
            {last && (<li className="page-item disabled">
                <span className="page-link" to="" aria-hidden="true">&raquo;</span>
            </li>)}
        </ul>
    );

    if (pendingApiCall) {
        actionDiv = (
            <Spinner />
        )
    }

    return (
        <div className="card mb-3">
            <div>
                <h3 className="card-header text-center text-primary text-nowrap ">{t('Users')} </h3>
                <div className="card-header input-group justify-content-end">
                    <input type="search" className="form-control rounded" placeholder={t('search by username')} aria-label='Search' aria-describedby="search-addon" />
                    <button type="button" className="btn btn-outline-primary">
                        {t('Search')}
                        <img src="https://img.icons8.com/windows/16/000000/search--v1.png" alt="search button" />
                    </button>
                </div>
            </div>
            <div className="list-group-flush">
                {users.map(user => (
                    <UserListItem key={user.username} user={user} />
                ))}
                {loadFailure && <div className="alert alert-danger text-danger m-3" role="alert">
                    <img src="https://img.icons8.com/tiny-color/14/000000/experimental-cancel-tiny-color.png" alt='alert icon' />
                    {t(" Page failed to load!")}
                </div>}
                {actionDiv}

            </div>
        </div>
    );
}

export default UserList;