// Response Interfaces
export interface UserAccessesResponse {
    success: boolean;
    accesses: UserSubdomainAccessWithUser[];
    msg?: string;
}

export interface UserInactiveAccessesResponse {
    success: boolean;
    accesses_inactive: UserSubdomainAccessWithUser[];
    msg?: string;
}

export interface UpdateAccessResponse {
    success: boolean;
    msg: string;
}

export interface DeleteAccessResponse {
    success: boolean;
    msg: string;
}

export interface AccessErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
    code?: string;
}

// Request Interfaces
export interface UpdateAccessRequest {
    subdomain?: string;
    access_expires_at?: Date | string;
    is_active?: boolean;
}

export interface GetAccessesQuery {
    active_only?: boolean;
    user_id?: string;
    subdomain?: string;
}

// Model Interfaces
export interface UserSubdomainAccess {
    id: number;
    id_user: number;
    subdomain: string;
    transaction_id?: number | null;
    access_granted_at?: Date | string | null;
    access_expires_at?: Date | string | null;
    is_active: boolean | number;
}

export interface UserSubdomainAccessWithUser extends UserSubdomainAccess {
    user?: {
        id_user: number;
        name_user: string;
        email_user: string;
    };
}

// For admin operations
export interface AdminAccessOperation {
    token: string;
}

// For user operations
export interface UserAccessOperation {
    token: string;
}

// Type Definitions
export type SubdomainCategory = 
    | 'cars'
    | 'real-estate'
    | 'fashion'
    | 'electronics'
    | 'services'
    | 'health'
    | 'food'
    | 'pets'
    | string; // Allow custom subdomains

export type AccessStatus = 
    | 'active'
    | 'inactive'
    | 'expired';