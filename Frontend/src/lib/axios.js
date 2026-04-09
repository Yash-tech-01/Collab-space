// https://slack-backend-henna.vercel.app/api    use this when we are in production phase
// localhost 8080                                use this for local development 




import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development'
    ? "http://localhost:5001/api" : "https://slack-backend-henna.vercel.app/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

