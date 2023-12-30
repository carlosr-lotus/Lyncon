import axios, { AxiosInstance } from "axios";

export function getApi(ctx?: any): AxiosInstance {
    const api: AxiosInstance = axios.create({
        baseURL: 'http://localhost:4500'
    });

    return api;
};