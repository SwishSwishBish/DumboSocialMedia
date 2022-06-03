import React, { useState, useEffect } from 'react';
import { useApiProgress } from '../shared/ApiProgress';

import { getPosts, getOldPosts, getNewPostCount, getNewPosts } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PostView from './PostView';

const PostFeed = () => {
    const { t } = useTranslation();
    const [postPage, setPostPage] = useState({ content: [], last: true, number: 0 });
    const [newPostCount, setNewPostCount] = useState(0);
    const { username } = useParams();
    const path = username ? `/api/1.0/users/${username}/posts?page=` : '/api/1.0/posts?page=';
    const initialPostLoadProgress = useApiProgress('get', path);

    let lastPostId = 0;
    let firstPostId = 0;

    if (postPage.content.length > 0) {
        firstPostId = postPage.content[0].id;
        const lastPostIndex = postPage.content.length - 1;
        lastPostId = postPage.content[lastPostIndex].id;
    }

    const oldPostPath = username ? `/api/1.0/users/${username}/posts/${lastPostId}` : `/api/1.0/posts/${lastPostId}`;
    const loadOldPostsProgress = useApiProgress('get', oldPostPath, true);

    const newPostPath = username
        ? `/api/1.0/users/${username}/posts/${firstPostId}?direction=after`
        : `/api/1.0/posts/${firstPostId}?direction=after`;
    const loadNewPostsProgress = useApiProgress('get', newPostPath, true);

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewPostCount(firstPostId, username);
            setNewPostCount(response.data.count);
        };
        let looper = setInterval(getCount, 5000);
        return function cleanup() {
            clearInterval(looper);
        };
    }, [firstPostId, username]);

    useEffect(() => {
        const loadPosts = async (page) => {
            try {
                const response = await getPosts(username, page);
                setPostPage(previousPostPage => ({
                    ...response.data,
                    content: [...previousPostPage.content, ...response.data.content]
                }));
            } catch (error) { }
        };
        loadPosts();
    }, [username]);



    const loadOldPosts = async () => {
        const response = await getOldPosts(lastPostId, username);
        setPostPage(previousPostPage => ({
            ...response.data,
            content: [...previousPostPage.content, ...response.data.content]
        }));
    };

    const loadNewPosts = async () => {
        const response = await getNewPosts(firstPostId, username);
        setNewPostCount(0);
        setPostPage(previousPostPage => ({
            ...previousPostPage,
            content: [...response.data, ...previousPostPage.content]
        }));

    };

    const onDeletePostSuccess = id => {
        setPostPage(previousPostPage => ({
            ...previousPostPage,
            content: previousPostPage.content.filter(post => post.id !== id)
        }));
    };

    const { content, last } = postPage;

    const LoadSpinner = () => {
        return (
            <div className="d-flex justify-content-center mb-2">
                <div className="spinner-grow spinner-grow-sm text-primary m-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-primary m-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-primary m-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {!(newPostCount === 0) && (
                <div className="alert alert-info text-primary text-center"
                    style={{ cursor: loadNewPostsProgress ? 'not-allowed' : 'pointer' }}
                    onClick={loadNewPostsProgress ? () => { } : loadNewPosts}>
                    {t('There are new posts!')}
                </div>

            )}

            {loadNewPostsProgress && <LoadSpinner />}

            {content.map(post => {
                return <PostView key={post.id} post={post} onDeletePost={onDeletePostSuccess} />;
            })}

            {(loadOldPostsProgress || initialPostLoadProgress) && < LoadSpinner />}

            {!last && <div className="alert alert-info text-primary text-center" style={{ cursor: loadOldPostsProgress ? 'not-allowed' : 'pointer' }} onClick={loadOldPostsProgress ? () => { } : loadOldPosts}>{t('Show more posts!')}</div>}

            {(last && !initialPostLoadProgress) && <div div className="alert alert-info text-primary text-center">{t('There are no posts here!')}</div>}

        </div>
    );
};
export default PostFeed;