import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { useApiProgress } from '../shared/ApiProgress';
import { sendPost, postPostAttachment } from "../api/apiCalls";
import ProfileImageWithDefault from '../components/ProfileImageWithDefault'
import AutoUploadImage from './AutoUploadImage.js';

const PostSubmit = () => {
    const { t } = useTranslation();
    const [post, setPost] = useState('');
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState(false);
    const [newImage, setNewImage] = useState();
    const [attachmentId, setAttachmentId] = useState();

    const pendingApiCall = useApiProgress('post', '/api/1.0/posts', true);
    const pendingFileUpload = useApiProgress('post', '/api/1.0/post-attachments', true);

    const { username, profileImage } = useSelector(store => ({
        username: store.username,
        profileImage: store.profileImage
    }));

    useEffect(() => {
        if (!focused) {
            setPost('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [post]);

    const onClickPost = async () => {
        const body = {
            content: post,
            attachmentId: attachmentId
        }
        try {
            await sendPost(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    const onChangeFile = event => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        };
        fileReader.readAsDataURL(file);
    };

    const uploadFile = async file => {
        const attachment = new FormData();
        attachment.append('file', file);
        const response = await postPostAttachment(attachment);
        setAttachmentId(response.data.id);
    };


    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid';
    }

    return (
        <div className="card gedf-card mb-2">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                    <li className="nav-item d-flex">
                        <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">
                            {t('Make a publication')}
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" to={`/user/${username}`}>
                            <ProfileImageWithDefault className="rounded-circle" width="26" height="26" profileimage={profileImage} />
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="card-body p-2">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                        <div className="form-group mb-2">
                            <textarea className={textAreaClass} id="message"
                                rows={focused ? "3" : "1"}
                                onFocus={() => setFocused(true)}
                                onChange={event => setPost(event.target.value)}
                                value={post}
                                placeholder={t('What are you thinking?')}>
                            </textarea>
                            <div className="invalid-feedback">{errors.content}</div>
                        </div>
                    </div>
                    {focused && <>
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload} />}

                        <div className="btn-toolbar justify-content-end">
                            <label className="btn btn-default p-0 ms-1 me-auto">
                                <img src="https://img.icons8.com/color/32/000000/pictures-folder.png" alt="imagesubmit" />
                                <input type="file" onChange={onChangeFile} hidden />
                            </label>
                            <div className="btn-group">
                                <button type="submit" onClick={onClickPost} className="btn btn-primary text-light" disabled={pendingApiCall || pendingFileUpload}>
                                    {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                                    {t('Share')}
                                </button>
                                <button className="btn btn-outline-danger px-1 ms-1" onClick={() => setFocused(false)} disabled={pendingApiCall || pendingFileUpload}>
                                    <img src="https://img.icons8.com/stickers/18/000000/delete-sign.png" alt='Cancel' />
                                </button>
                            </div>
                        </div></>}
                </div>
            </div>
        </div>
    );
};

export default PostSubmit;