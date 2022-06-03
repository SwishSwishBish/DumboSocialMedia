import React from 'react'
import UserList from '../components/UserList';
import HomeProfileCard from '../components/HomeProfileCard';
import PostSubmit from '../components/PostSubmit';
import PostFeed from '../components/PostFeed';
import { useSelector } from 'react-redux';
import DonateCard from '../components/DonateCard';
import TopicsCard from '../components/TopicsCard';
import PopularPost from '../components/PopularPost';

const Home = () => {
    const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }))

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <HomeProfileCard />
                    <PopularPost />
                </div>
                <div className="col-6 gedf-main">
                    {isLoggedIn && <PostSubmit />}
                    <PostFeed />

                </div>
                <div className="col-3">
                    <UserList />
                    <TopicsCard />
                    <DonateCard />
                </div>
            </div>
        </div >
    );
};

export default Home;
