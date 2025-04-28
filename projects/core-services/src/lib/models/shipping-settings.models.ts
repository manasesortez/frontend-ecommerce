// Response Interfaces
export interface ShippingSettingsResponse {
    settings: ShippingSettings;
}

export interface ShippingSettingsListResponse {
    settings: ShippingSettings[];
}

export interface CreateShippingSettingsResponse {
    msg: string;
    settings: ShippingSettings;
}

export interface UpdateShippingSettingsResponse {
    msg: string;
    settings: ShippingSettings;
}

export interface DeleteShippingSettingsResponse {
    msg: string;
}

export interface ErrorResponse {
    msg: string;
    error?: any;
}

// Request Interfaces
export interface CreateShippingSettingsRequest {
    id_store: number;
    subdomain: string;
    default_shipping_cost: number;
    free_shipping_threshold?: number | null;
    is_active?: boolean;
    estimated_delivery_days?: number;
}

export interface UpdateShippingSettingsRequest {
    default_shipping_cost?: number;
    free_shipping_threshold?: number | null;
    is_active?: boolean;
    estimated_delivery_days?: number;
}

export interface GetShippingSettingsParams {
    id_store: string;
    subdomain?: string;
}

// Model Interface
export interface ShippingSettings {
    id: number;
    id_store: number;
    subdomain: string;
    default_shipping_cost: number;
    free_shipping_threshold: number | null;
    is_active: boolean;
    estimated_delivery_days: number;
    date_created: string | Date;
    date_updated: string | Date;
    store?: StoreInfo; // Optional store relation
}

export interface StoreInfo {
    id_store: number;
    name_store?: string;
    logo_store?: string | null;
    // Add other store fields as needed
}

// For responses that include messages and data
export interface ShippingSettingsMessageResponse {
    msg: string;
    settings?: ShippingSettings;
}