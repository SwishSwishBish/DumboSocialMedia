import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';

const UserLogin = props => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined)
    }, [username, password])

    const onClickLogin = async event => {
        event.preventDefault();
        const creds = {
            username,
            password
        };
        const { history } = props;
        const { push } = history;
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push("/");
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    };

    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('post', '/api/1.0/auth');
    const buttonEnabled = username && password;

    return (
        <div className="container">
            <form className="shadow-lg p-3 mb-5 bg-body rounded border border-primary d-grid gap-2 col-8 mx-auto mt-5">
                <h1 className="text-center">{t('Login')}</h1>
                {error && <div className="alert alert-danger text-danger" role="alert">
                    <img src="https://img.icons8.com/tiny-color/14/000000/experimental-cancel-tiny-color.png" alt='alert icon' />
                    {t(" Unauthorized access!")}
                </div>}
                <Input name="username" label={t("Username")} placeholder="Username" onChange={event => { setUsername(event.target.value) }}></Input>
                <Input name="password" type="password" label={t("Password")} placeholder="Password" onChange={event => setPassword(event.target.value)} ></Input>
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-primary text-light text-nowrap" onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall}>
                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                        {t('Login')}
                    </button>
                </div>
            </form>

        </div>
    );
}

export default UserLogin;
