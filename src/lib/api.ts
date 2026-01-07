import axios from "axios";

import { useUserStore } from "@/modules/custom-order/store/userStore";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.cooqu.co.in", // Adjust as per actual backend URL
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
