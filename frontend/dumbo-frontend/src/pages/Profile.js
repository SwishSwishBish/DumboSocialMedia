import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress'
import Spinner from '../components/Spinner';
import PostFeed from '../components/PostFeed';

const Profile = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const { username } = useParams();
    const [notFound, setNotFound] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        };
        loadUser();
    }, [username]);

    if (pendingApiCall || user.username !== username) {
        return (
            <Spinner />)
    }

    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger text-danger text-center mt-2" role="alert">
                    <img src="https://img.icons8.com/fluency/100/000000/spam.png" alt='alert icon' /><br />
                    {t('User not found!')}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <ProfileCard user={user} />
            </div>
            <div className="row  d-flex justify-content-center">
                <div className="col-md-10">
                    <PostFeed />
                </div>
            </div>
        </div>
    );
};
export default Profile;