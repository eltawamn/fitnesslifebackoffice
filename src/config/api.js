import axios from "axios";

const devUrl = 'http://localhost:5050';
const prodUrl = 'https://fitnesspark.onrender.com';

const isDev = process.env.NODE_ENV === 'development';

export const baseUrl = isDev ? devUrl : prodUrl;

export const api = axios.create({
    baseURL: baseUrl
})

api.interceptors.request.use(req => {
    const authToken = localStorage.getItem('authToken')

    if(authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }

    return req
}, error => {
    return Promise.reject(error);
});
