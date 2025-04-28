// Response Interfaces
export interface UsersResponse {
    success: boolean;
    users: SafeUser[];
    msg?: string;
}

export interface SingleUserResponse {
    success: boolean;
    user: SafeUser;
    msg?: string;
}

export interface CreateUserResponse {
    success: boolean;
    msg: string;
    id?: number;
    token?: string;
}

export interface UpdateUserResponse {
    success: boolean;
    msg: string;
    updatedBy?: 'Admin' | 'User';
}

export interface DeleteUserResponse {
    success: boolean;
    msg: string;
    deletedBy?: 'Admin' | 'Owner';
}

export interface AuthStatusResponse {
    authenticated: boolean;
    user: SafeUser | null;
}

export interface UserErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
    code?: string;
}

export interface GetUsersQuery {
    verified_only?: boolean;
    active_only?: boolean;
    role?: 'user' | 'superadmin';
}

// Model Interfaces
export interface User {
    id_user: number;
    name_user: string;
    email_user: string;
    password_user: string;
    image_user?: string | null;
    token_user?: string | null;
    token_exp_user?: string | null;
    method_user?: string | null;
    verification_user: number;
    subscription_status_user: number;
    subscription_type_user?: string | null;
    subscription_start_user?: Date | string | null;
    subscription_end_user?: Date | string | null;
    country_user?: string | null;
    department_user?: string | null;
    city_user?: string | null;
    address_user?: string | null;
    phone_user?: string | null;
    date_created_user?: string | null;
    date_updated_user?: string | null;
    auto_renew_user?: number | null;
    is_store_admin?: number | null;
}

export interface SafeUser extends Omit<User, 'password_user' | 'token_user'> {}

// For admin operations
export interface AdminUserOperation {
    token: string;
}

// For user operations
export interface UserSelfOperation {
    token: string;
}

// Type Definitions
export type UserRole = 
    | 'user'
    | 'superadmin';

export type UserVerificationStatus = 
    | 0 // Unverified
    | 1 // Verified
    | number; // For potential future statuses

export type SubscriptionStatus = 
    | 0 // Inactive
    | 1 // Active
    | number; // For potential future statuses

export type AuthMethod = 
    | 'directo'
    | 'google'
    | 'facebook'
    | string; // Other auth methods