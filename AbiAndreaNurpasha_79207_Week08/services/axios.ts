import axios from 'axios';

const ENV = process.env.EXPO_PUBLIC_API_URL;

export const getUsers = () => {
    return axios.get(ENV + "users");
};

export const getPosts = () => {
    return axios.get(ENV + "posts");
};

export const getPostById = (id) => {
    return axios.get(ENV + "posts/" + id);
};

export const postData = (data) => {
    return axios.post(ENV + "posts", data);
};

export const updatePost = (id, data) => {
    return axios.put(ENV + "posts/" + id, data);
};