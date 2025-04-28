// Base Store Interface
export interface Store {
    id_store: number;
    id_user_store: number | null;
    name_store: string | null;
    description_store: string | null;
    logo_store: string | null;
    url_store: string | null;
    subdomain: string | null;
    country: string | null;
    department: string | null;
    city: string | null;
    status_store: number;
    date_created_store: string | null;
    date_updated_store: string | null;
    whatsapp_number: string | null;
    whatsapp_message_template: string | null;
}

// Response Interfaces
export interface StoresResponse {
    success: boolean;
    data: Store[];
    meta?: PaginationMeta;
}

export interface StoreResponse {
    success: boolean;
    store: Store;
}

export interface CreateStoreResponse {
    success: boolean;
    data: {
        store: {
            id: number;
            name?: string;
            description?: string;
            created_at?: string;
            owner_id?: number;
        };
        admin?: {
            role: string;
            max_editors: number;
        };
        subscription?: {
            plan_id: number;
            status: string;
        };
        user_updated?: {
            is_store_admin: number;
            subscription_status: number;
        };
    };
}

export interface UpdateStoreResponse {
    msg: string;
}

export interface DeleteStoreResponse {
    success: boolean;
    message: string;
    deleted_store?: {
        id: number;
        name: string;
    };
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    error_code?: string;
    msg?: string;
    error?: any;
}

export interface GetStoreParams {
    id: string;
}

export interface GetStoresQuery {
    page?: string;
    limit?: string;
    country?: string;
    subdomain?: string;
}

// Utility Interfaces
export interface PaginationMeta {
    total: number;
    page: number;
    pages: number;
    itemsPerPage: number;
}

export interface StoreWithUser extends Store {
    user?: {
        id_user: number;
        name_user: string;
        email_user: string;
        subscription_status_user: number;
        subscription_plan?: {
            id_plan: number;
            name_plan: string;
            max_products_plan?: number;
        };
    };
}

// Strict typing versions
export type StoreStatus = 0 | 1; // 0=inactive, 1=active
export type StoreSubdomain = 'cars' | 'real-estate' | 'fashion' | 'electronics' | 'services' | 'health' | 'food' | 'pets';

export interface StrictStore {
    id_store: number;
    id_user_store: number;
    name_store: string;
    description_store: string;
    logo_store: string;
    url_store: string;
    subdomain: StoreSubdomain;
    country: string;
    department: string;
    city: string;
    status_store: StoreStatus;
    date_created_store: string;
    date_updated_store: string;
    whatsapp_number: string;
    whatsapp_message_template: string;
}