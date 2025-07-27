import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

// 중복 alert 창 뜨는 것을 방지하기 위한 플래그
let isRedirecting = false;

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
        // 401 에러이고, 리다이렉션이 아직 시작되지 않았을 때만 실행
        if (err.response && err.response.status === 401 && !isRedirecting) {

            // 플래그를 true 로 설정하여 중복 alert 창 방지
            isRedirecting = true;

            sessionStorage.clear();

            alert('동일한 계정이 다른 곳에서 로그인되었습니다.');

            location.href = "/";
        }
        return Promise.reject(err);
    }
);

export default api;