import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/dumbo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageWithDefault from './ProfileImageWithDefault'


const Navbar = props => {
    const { t } = useTranslation();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuArea = useRef(null);

    const { username, isLoggedIn, displayName, profileImage } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        profileImage: store.profileImage
    }));


    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        };
    }, [isLoggedIn]);

    const menuClickTracker = event => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    let links = (

        <ul className="navbar-nav ms-auto">
            <li>
                <Link className="nav-link text-nowrap text-primary" to="/login">
                    {t('Login')}
                </Link>
            </li>
            <li>
                <Link className="nav-link text-nowrap text-primary" to="/signup">
                    {t('Sign Up')}
                </Link>
            </li>
        </ul>
    );
    if (isLoggedIn) {

        let dropdownClass = "dropdown-menu dropdown-menu-light shadow-sm p-0 ms-2";
        if (menuVisible) {
            dropdownClass += " show";
        }

        links = (

            <ul className="navbar-nav ms-auto">
                <li>
                    <ul className="navbar-nav ms-auto" ref={menuArea}>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-nowrap text-primary" to={''} onClick={() => setMenuVisible(true)}>
                                <span role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    <ProfileImageWithDefault className="rounded-circle shadow-lg me-1" width="32" height="32" profileimage={profileImage} />
                                    {displayName}
                                </span>
                            </Link>
                            <ul className={dropdownClass} aria-labelledby="navbarDarkDropdownMenuLink">
                                <li>
                                    <Link className="dropdown-item" to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
                                        {t('My Profile')}
                                    </Link>
                                </li>
                                <li><Link className="dropdown-item" to={''} onClick={() => setMenuVisible(false)} >{t('Settings')}</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="nav-link text-nowrap" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
                    {t('Logout')} <img src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/16/000000/external-logout-arrow-line-royyan-wijaya-detailed-outline-royyan-wijaya.png" alt='logout icon' />
                </li>
            </ul>
        );
    };

    return (
        <div className="bg-secondary shadow mb-2 p-0">
            <nav className="navbar navbar-expand navbar-light container p-0">

                <Link className="navbar-brand fs-3 text-primary" to="/">
                    <h1 className='fw-bold'><img src={logo} width="50" alt='Dumbo Logo' />Dumbo</h1>
                </Link>
                {links}
            </nav >
        </div >
    );
};

export default Navbar;