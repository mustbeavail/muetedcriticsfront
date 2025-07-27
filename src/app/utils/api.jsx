import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
    }
    return config;
});

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response && err.response.status === 401) {
            sessionStorage.clear();
            alert('동일한 계정이 다른 곳에서 로그인되었습니다.');
            location.href = "/";
        }
        return Promise.reject(err);
    }
);

export default api;