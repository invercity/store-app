export interface Store {
    id: string;
    name: string;
    address?: string;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    storeId: string;
    createdAt: string;
}

export interface ProductListResponse {
    data: Product[];
    total: number;
    limit: number;
    page: number;
}

export interface ProductFilters {
    category?: string;
    limit?: number;
    page?: number;
    minPrice?: number;
    maxPrice?: number;
}
