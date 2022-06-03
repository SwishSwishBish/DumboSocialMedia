import React from 'react';
import UserSignup from '../pages/UserSignup';
import UserLogin from '../pages/UserLogin';
import LanguageSelect from '../components/LanguageSelect';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const App = () => {
    const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }));
    return (
        <div>
            <Router>
                <Navbar />
                <LanguageSelect />
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    {!isLoggedIn && <Route path="/login" component={UserLogin} />}
                    <Route path={"/signup"} component={UserSignup} />
                    <Route path="/user/:username" component={Profile} />
                    <Redirect to={"/"} />
                </Switch>
                <div className='mt-6'>
                    <Footer /></div>
            </Router>
        </div>
    );
}

export default App;