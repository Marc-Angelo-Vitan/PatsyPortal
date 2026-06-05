import { AxiosRequestConfig } from 'axios';
import { client } from './clients';

export const api = {
    get: async <T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        const response = await client.get<T>(url, config);
        return response.data;
    },

    post: async <T, B = unknown>(
        url: string,
        body?: B
    ): Promise<T> => {
        const response = await client.post<T>(url, body);
        return response.data;
    },

    put: async <T, B = unknown>(
        url: string,
        body?: B
    ): Promise<T> => {
        const response = await client.put<T>(url, body);
        return response.data;
    },

    delete: async <T>(
        url: string
    ): Promise<T> => {
        const response = await client.delete<T>(url);
        return response.data;
    },
};