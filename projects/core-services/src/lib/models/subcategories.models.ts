// Response Interfaces
export interface SubcategoriesResponse {
    subcategories: Subcategory[];
    fromCache?: boolean;
    msg?: string;
}

export interface SubcategoryResponse {
    subcategory: SubcategoryWithCategory;
    fromCache?: boolean;
    msg?: string;
}

export interface CreateSubcategoryResponse {
    msg: string;
    subcategory: Subcategory;
}

export interface UpdateSubcategoryResponse {
    msg: string;
    subcategory: Subcategory;
}

export interface DeleteSubcategoryResponse {
    msg: string;
}

export interface ErrorResponse {
    msg: string;
    error?: any;
}

// Request Interfaces
export interface CreateSubcategoryRequest {
    name_sub_category: string;
    subdomain: SubdomainType;
    id_category: number;
    icon_sub_category?: string;
}

export interface UpdateSubcategoryRequest {
    name_sub_category?: string;
    subdomain?: SubdomainType;
    id_category?: number;
    icon_sub_category?: string | null;
}

export interface GetSubcategoriesQuery {
    subdomain: string;
    category_id: string;
}

export interface GetSubcategoryParams {
    id: string;
}

// Model Interfaces
export interface Subcategory {
    id_sub_category: number;
    name_sub_category: string;
    subdomain: SubdomainType;
    id_category: number;
    icon_sub_category: string | null;
    created_at_sub_category: string | Date;
    updated_at_sub_category: string | Date;
}

export interface SubcategoryWithCategory extends Subcategory {
    category?: {
        id_category: number;
        name_category: string;
    };
}

// Type Definitions
export type SubdomainType = 'cars' | 'real-estate' | 'fashion' | 'electronics' | 'services';

// For cache operations
export interface CacheKeys {
    publicList: string;
    publicItem: (id: number) => string;
    privateList: (subdomain: string, userId: number) => string;
}