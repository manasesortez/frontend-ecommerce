import { CarMetadata, RealEstateMetadata, FashionMetadata, ElectronicsMetadata, ServicesMetadata, HealthMetadata, FoodMetadata, PetMetadata } from "../types/productTypes";

// Product interfaces
export interface ProductResponse {
    products?: Product[];
    product?: Product;
    fromCache?: boolean;
    pagination?: Pagination;
    msg?: string;
    error?: any;
    changes?: string[] | string;
}

export interface Product {
    id_product: number;
    name_product: string;
    description_product: string | null;
    base_price_product: number;
    subdomain: SubdomainType;
    id_sub_category: number;
    id_store: number | null;
    metadata_product: CarMetadata[] | RealEstateMetadata[] | FashionMetadata[] | ElectronicsMetadata[] | ServicesMetadata[] | HealthMetadata[] | FoodMetadata[] | PetMetadata[];
    status_product: 'active' | 'inactive' | 'sold';
    sku: string | null;
    stock: number | null;
    max_quantity: number;
    min_quantity: number;
    created_at_product: string | Date;
    updated_at_product: string | Date;
}

export type SubdomainType = 'cars' | 'real-estate' | 'fashion' | 'electronics' | 'services' | 'health' | 'food' | 'pets';

export interface Pagination {
    page: number;
    pageSize: number;
    totalCount?: number;
    totalPages?: number;
}

// For product creation/update
export interface CreateProductRequest {
    name_product: string;
    description_product?: string;
    base_price_product: number;
    subdomain: SubdomainType;
    id_sub_category: number;
    metadata_product: CarMetadata[] | RealEstateMetadata[] | FashionMetadata[] | ElectronicsMetadata[] | ServicesMetadata[] | HealthMetadata[] | FoodMetadata[] | PetMetadata[];
    id_store?: number;
    status_product?: 'active' | 'inactive' | 'sold';
    stock?: number;
    max_quantity?: number;
    min_quantity?: number;
    image_product?: any; // For file upload
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    imagesToDelete?: string | string[];
    change_reason?: string;
}

// For product queries
export interface ProductQueryParams {
    subdomain?: SubdomainType;
    status?: string;
    store?: string;
    country?: string;
    page?: string;
    pageSize?: string;
}

export interface msgProducts{
    msg: string;
}