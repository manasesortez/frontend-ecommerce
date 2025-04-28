// Response Interfaces
export interface TaxSettingsResponse {
    success: boolean;
    taxSettings: TaxSetting[];
    message?: string;
}

export interface SingleTaxSettingResponse {
    success: boolean;
    taxSetting: TaxSettingWithStore;
    message?: string;
}

export interface CreateTaxSettingResponse {
    success: boolean;
    message: string;
    taxSetting?: TaxSetting;
}

export interface UpdateTaxSettingResponse {
    success: boolean;
    message: string;
    taxSetting?: TaxSetting;
}

export interface DeleteTaxSettingResponse {
    success: boolean;
    message: string;
}

export interface TaxErrorResponse {
    success: boolean;
    message: string;
    error?: string;
    code?: string;
}

// Request Interfaces
export interface CreateTaxSettingRequest {
    tax_name: string;
    tax_rate: number;
    is_active?: boolean;
    applies_to_all?: boolean;
    applies_to_categories?: number[];
    applies_to_products?: number[];
}

export interface UpdateTaxSettingRequest {
    tax_name?: string;
    tax_rate?: number;
    is_active?: boolean;
    applies_to_all?: boolean;
    applies_to_categories?: number[] | null;
    applies_to_products?: number[] | null;
}

export interface GetTaxSettingsQuery {
    active_only?: boolean;
    store_id?: string;
}

// Model Interfaces
export interface TaxSetting {
    id_tax: number;
    id_store: number;
    tax_name: string;
    tax_rate: number;
    is_active: boolean;
    applies_to_all?: boolean;
    applies_to_categories?: number[] | null;
    applies_to_products?: number[] | null;
    date_created?: Date | string;
    date_updated?: Date | string;
}

export interface TaxSettingWithStore extends TaxSetting {
    store?: {
        id_store: number;
        name_store: string;
    };
}

// For store operations
export interface StoreTaxOperation {
    token: string;
    id_store: string;
}

// Type Definitions
export type TaxScope = 
    | 'all'
    | 'categories'
    | 'products';

export type TaxRatePrecision = 
    | 1  // 0.1
    | 2  // 0.01
    | 0; // whole numbers