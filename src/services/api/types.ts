export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginationResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}

export interface Product {
    id: string;
    name: string;
    categoryId: string;
    price: number;
    quantity?: number;
    imageUrl?: string;
    isAvailable?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface registerRequest {
    name: string;
    email: string;
    password: string;
    shopName: string;
    shopAddress: string;
}

export interface registerResponse {
    message: string;
    owner: any;
    token: string;
}