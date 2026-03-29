import axios from "axios"
import { useAuthStore } from "../store/AuthStore";


const baseURL = import.meta.env.VITE_API_URL


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};


export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().token

    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})



axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            resolve(axiosInstance(originalRequest));
                        },
                        reject: (error) => {
                            reject(error);
                        },
                    });
                });
            }

            isRefreshing = true;
            const logOut = useAuthStore.getState().logOut
            try {
                const login = useAuthStore.getState().loginAuth

                const res = await axios.get(
                    `${baseURL}/api/v1/user/refresh-token`, {},
                    { withCredentials: true }
                );


                const newAccessToken = (res.data.accessToken)

                login(res.data?.data, res?.data.accessToken);



                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshErr) {
                processQueue(refreshErr, null);
                logOut()
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);

    })