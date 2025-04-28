// Response Interfaces
export interface SubscriptionPlansResponse {
    plans: SubscriptionPlan[];
    success?: boolean;
    msg?: string;
}

export interface SinglePlanResponse {
    plan: SubscriptionPlan;
    success?: boolean;
    msg?: string;
}

export interface CreatePlanResponse {
    success: boolean;
    msg: string;
    id?: number;
}

export interface UpdatePlanResponse {
    success: boolean;
    msg: string;
}

export interface DeletePlanResponse {
    success: boolean;
    msg: string;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
}

// Request Interfaces
export interface CreatePlanRequest {
    name_plan: string;
    description_plan: string;
    price_plan: number;
    duration_plan: number;
    max_products_plan?: number;
    max_editors?: number;
    max_storage_mb?: number;
    max_images_per_product?: number;
    max_file_size_mb?: number;
    allowed_file_types?: string;
}

export interface UpdatePlanRequest {
    name_plan?: string;
    description_plan?: string;
    price_plan?: number;
    duration_plan?: number;
    status_plan?: number;
    max_products_plan?: number;
    max_editors?: number;
    max_storage_mb?: number;
    max_images_per_product?: number;
    max_file_size_mb?: number;
    allowed_file_types?: string;
}

export interface GetPlansQuery {
    status?: string;
    sort?: 'price' | 'duration' | 'name';
    order?: 'ASC' | 'DESC';
}

// Model Interface
export interface SubscriptionPlan {
    id_plan: number;
    name_plan: string;
    description_plan: string;
    price_plan: number;
    duration_plan: number;
    status_plan: number;
    max_products_plan: number;
    max_editors: number;
    max_storage_mb: number;
    max_images_per_product: number;
    max_file_size_mb: number;
    allowed_file_types: string;
    date_created_plan?: Date | string | null;
    date_updated_plan?: Date | string | null;
}

// For admin operations
export interface AdminPlanOperation {
    token: string;
}

// Type Definitions
export type PlanStatus = 
    | 0 // Inactive
    | 1 // Active
    | number; // For potential future statuses

export type PlanFeature = 
    | 'max_products'
    | 'max_editors'
    | 'storage'
    | 'product_images'
    | 'file_size'
    | 'file_types'
    | string; // Allow custom features