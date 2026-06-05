export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        PROFILE: '/auth/profile',
    },

    PRODUCTS: {
        GET_ALL: '/products',
        CREATE: '/products',
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,
        GET_BY_ID: (id: string) => `/products/${id}`,
    },

    CATEGORY: {
        GET_ALL: '/categories',
        CREATE: '/categories',
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: (id: string) => `/categories/${id}`,
        GET_BY_ID: (id: string) => `/categories/${id}`,
    },

};