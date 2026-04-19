import axios from 'axios';
import {
    Store,
    Product,
    ProductListResponse,
    ProductFilters,
    InventoryValueResponse,
} from '../types';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

let errorCallback: ((message: string) => void) | null = null;

export const setErrorCallback = (cb: (message: string) => void) => {
    errorCallback = cb;
};

api.interceptors.response.use(
    response => response,
    error => {
        const message =
            error.response?.data?.message || error.message || 'An unexpected error occurred';
        if (errorCallback) {
            errorCallback(message);
        }
        return Promise.reject(error);
    },
);

export const storeApi = {
    get: (id: string) => api.get<Store>(`/store/${id}`).then(res => res.data),
    getAll: () => api.get<Store[]>('/store').then(res => res.data),
    create: (name: string) => api.post<Store>('/store', { name }).then(res => res.data),
    update: (id: string, name: string) =>
        api.patch<Store>(`/store/${id}`, { name }).then(res => res.data),
    remove: (id: string) => api.delete(`/store/${id}`).then(res => res.data),
    getProducts: (id: string, filters?: ProductFilters) =>
        api
            .get<ProductListResponse>(`/store/${id}/products`, { params: filters })
            .then(res => res.data),
    getInventoryValue: (id: string) =>
        api.get<InventoryValueResponse>(`/store/${id}/inventory-value`).then(res => res.data),
};

export const productApi = {
    getAll: (filters?: ProductFilters) =>
        api.get<ProductListResponse>('/product', { params: filters }).then(res => res.data),
    getById: (id: string) => api.get<Product>(`/product/${id}`).then(res => res.data),
    create: (data: Omit<Product, 'id' | 'createdAt'>) =>
        api.post<Product>('/product', data).then(res => res.data),
    update: (id: string, data: Partial<Product>) =>
        api.patch<Product>(`/product/${id}`, data).then(res => res.data),
    remove: (id: string) => api.delete(`/product/${id}`).then(res => res.data),
};
