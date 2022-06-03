import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser, deleteUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { updateSuccess, logoutSuccess } from '../redux/authActions';
import Modal from './Modal';

const ProfileCard = props => {
    const { t } = useTranslation();
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const [editable, setEditable] = useState(false);
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const [newProfileImage, setNewProfileImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            displayName: undefined
        }));
    }, [updatedDisplayName]);

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            profileImage: undefined
        }));
    }, [newProfileImage]);

    const { username, displayName, profileImage } = user;

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewProfileImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);

    const onClickSave = async () => {

        let profileImage;
        if (newProfileImage) {
            profileImage = newProfileImage.split(',')[1]
        }

        const body = {
            displayName: updatedDisplayName,
            profileImage: profileImage
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }
    };


    const onChangeFile = event => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewProfileImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const onClickCancel = () => {
        setModalVisible(false);
    };

    const onClickDeleteUser = async () => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push('/');
    };

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

    const pendingApiCallDeleteUser = useApiProgress('delete', `/api/1.0/users/${username}`, true);

    const { displayName: displayNameError, profileImage: profileImageError } = validationErrors;

    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="col-md-10">
                    <div className="card profileCard p-3 py-4">
                        <div className="text-center">
                            <ProfileImageWithDefault width="150" height="150" className="img-thumbnail rounded-circle" alt={`${username} profile`} profileimage={profileImage} temp={newProfileImage} />
                        </div>
                        {!inEditMode && (
                            <div className="text-center mt-3">
                                <span className="bg-primary p-1 px-4 rounded text-white">@{username}</span>
                                <h3 className="mt-2 mb-0">{displayName}</h3>
                                <span>Lorem Ipsum Dolor</span>
                                <div className="px-5 mt-1">
                                    <p className="fonts">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                                </div>
                                {editable && (
                                    <div className="buttons">
                                        <button className="btn btn-primary px-4" onClick={() => setInEditMode(true)}>
                                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                                            {t('Edit')}<img src="https://img.icons8.com/stickers/30/000000/sign-up.png" alt='Edit' />
                                        </button>
                                        <button className="btn btn-outline-danger px-4 ms-3" onClick={() => setModalVisible(true)}>{t('Delete')}<img src="https://img.icons8.com/stickers/30/000000/delete-forever.png" alt='Delete' /></button>
                                    </div>
                                )}
                            </div>
                        )}

                        {inEditMode && (
                            <div className="text-center mt-3">
                                <div class="mb-3">
                                    <input type="file" onChange={onChangeFile} className={profileImageError ? "form-control is-invalid" : "form-control mb-2"} />
                                    <div class="invalid-feedback">{profileImageError}</div>
                                </div>
                                <Input name="displayName" defaultValue={displayName} onChange={(event) => { setUpdatedDisplayName(event.target.value) }} label={t("Change Display Name")} placeholder="Display Name" error={displayNameError}></Input>
                                <div className="buttons">
                                    <button className="btn btn-primary px-4" onClick={onClickSave} disabled={pendingApiCall}>
                                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                                        {t('Save')}<img src="https://img.icons8.com/stickers/30/000000/inbox.png" alt='Save' />
                                    </button>
                                    <button className="btn btn-outline-danger px-4 ms-3" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
                                        {t('Cancel')}<img src="https://img.icons8.com/stickers/30/000000/delete-sign.png" alt='Cancel' />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                visible={modalVisible}
                okButton={t('Delete My Account')}
                onClickCancel={onClickCancel}
                onClickOk={onClickDeleteUser}
                message={<div className="text-center">{t('Your account will be permanently deleted.')}<br />{t('Are you sure?')}</div>}
                pendingApiCall={pendingApiCallDeleteUser}
            />
        </div>
    );
};

export default ProfileCard;