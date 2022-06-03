import React, { useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { signupHandler } from '../redux/authActions';
import { useDispatch } from 'react-redux';

const UserSignup = props => {

    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const onChange = event => {
        const { name, value } = event.target;
        setErrors((previousErrors) => [{ ...previousErrors, [name]: undefined }]);
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    };

    const onClickSignup = async event => {
        event.preventDefault();

        const { history } = props;
        const { push } = history;
        const { username, displayName, password } = form;

        const body = {
            username,
            displayName,
            password
        };

        try {
            await dispatch(signupHandler(body));
            push("/");
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };

    const { t } = useTranslation();

    const pendingApiCallSignUp = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');
    const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin;

    const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;

    let confirmPasswordError;
    if (form.password !== form.confirmPassword) {
        confirmPasswordError = t('Password mismatch!');
    }

    return (
        <div className="container">

            <form className="shadow-lg p-3 mb-5 bg-body rounded border border-primary d-grid gap-2 col-8 mx-auto mt-5">
                <h1 className="text-center">{t('Sign Up')}</h1>
                <Input name="username" label={t("Username")} placeholder="Username" error={usernameError} onChange={onChange}></Input>
                <Input name="displayName" label={t("Display Name")} placeholder="Display Name" error={displayNameError} onChange={onChange}></Input>
                <Input name="password" type="password" label={t("Password")} placeholder="Password" error={passwordError} onChange={onChange}></Input>
                <Input name="confirmPassword" type="password" label={t("Confirm Password")} placeholder="Confirm Password" error={confirmPasswordError} onChange={onChange}></Input>
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-primary text-light text-nowrap" onClick={onClickSignup} disabled={pendingApiCall || confirmPasswordError !== undefined}>
                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                        {t('Sign Up')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserSignup;