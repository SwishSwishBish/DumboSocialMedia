import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dumbo from '../assets/dumbo.gif'

const HomeProfileCard = props => {
    const { t } = useTranslation();

    const { username, isLoggedIn, displayName } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        profileImage: store.profileImage
    }));


    let links = (
        <>
            <div className="card-body p-0" >
                <img className="card-img-top" src={dumbo} />
            </div>
            <ul className="list-group list-group-flush p-0">
                <li className="list-group-item"></li>
                <li className="list-group-item text-center">
                    <div className="h5 text-muted ">{t('Join us!')}</div>
                    <span className='text-center'>
                        <Link to="/login" className="btn btn-primary text-nowrap text-light me-1 mt-1">{t('Login')}</Link>
                        <Link to="/signup" className="btn btn-primary text-nowrap text-light mt-1">{t('Sign Up')}</Link>
                    </span>

                </li>
            </ul>
        </>
    );

    if (isLoggedIn) {

        links = (
            <>
                <div className="card-body">
                    <span className="h5 m-0 text-nowrap">@{username}</span>
                    <div className="h7 text-muted">{t('Name :')} {displayName}</div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="h6 text-muted text-nowrap">{t('Followers')}</div>
                        <div className="h5">5.2342</div>
                    </li>
                    <li className="list-group-item">
                        <div className="h6 text-muted text-nowrap">{t('Following')}</div>
                        <div className="h5">6758</div>
                    </li>
                    <li className="list-group-item">
                        <div className="h6 text-muted text-nowrap">{t('Notifications')}</div>
                        <div className="h5">2</div>
                    </li>
                </ul>
            </>
        );
    };

    return (
        <div className="card profileCard p-3 py-4 mb-3">

            {links}
        </div>
    );
};

export default HomeProfileCard;


