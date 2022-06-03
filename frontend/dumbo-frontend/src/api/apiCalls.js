import axios from "axios"

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language
};

export const signup = body => {
    return axios.post('/api/1.0/users', body);
};

export const login = creds => {
    return axios.post('/api/1.0/auth', creds);
};

export const getAllUsers = (page = 0, size = 4) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
};

export const sendPost = post => {
    return axios.post('/api/1.0/posts', post);
};

export const getPosts = (username, page = 0) => {
    const path = username ? `/api/1.0/users/${username}/posts?page=` : '/api/1.0/posts?page=';
    return axios.get(path + page);
};

export const getOldPosts = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/posts/${id}` : `/api/1.0/posts/${id}`;
    return axios.get(path);
};

export const getNewPostCount = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/posts/${id}?count=true` : `/api/1.0/posts/${id}?count=true`;
    return axios.get(path);
};

export const getNewPosts = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/posts/${id}?direction=after` : `/api/1.0/posts/${id}?direction=after`;
    return axios.get(path);
};

export const postPostAttachment = attachment => {
    return axios.post('/api/1.0/post-attachments', attachment);
};

export const deletePost = id => {
    return axios.delete(`/api/1.0/posts/${id}`);
};

export const deleteUser = username => {
    return axios.delete(`/api/1.0/users/${username}`);
};

export const logout = () => {
    return axios.post('/api/1.0/logout');
}
