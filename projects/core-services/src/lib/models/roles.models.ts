// Response Interfaces
export interface RolesResponse {
    roles: Role[];
}

export interface RoleResponse {
    role: Role;
}

export interface CreateRoleResponse {
    msg: string;
    id: number;
}

export interface UpdateRoleResponse {
    msg: string;
}

export interface DeleteRoleResponse {
    msg: string;
}

export interface ErrorResponse {
    msg: string;
    error?: any;
}

// Request Interfaces
export interface CreateRoleRequest {
    name_role: string;
    description_role: string;
}

export interface UpdateRoleRequest {
    name_role?: string;
    description_role?: string;
}

// Model Interface
export interface Role {
    id_role: number;
    name_role: string;
    description_role: string;
    date_created_role: string; // or Date
    date_updated_role: string; // or Date
    is_superadmin: number; // 0 or 1
}

// Alternative with stricter types
export interface StrictRole {
    id_role: number;
    name_role: string;
    description_role: string;
    date_created_role: Date;
    date_updated_role: Date;
    is_superadmin: 0 | 1; // Only allows 0 or 1
}

// For responses that include messages and data
export interface RoleMessageResponse {
    msg: string;
    role?: Role;
}

// For paginated responses (if implemented later)
export interface PaginatedRolesResponse {
    roles: Role[];
    pagination: {
        page: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
    };
}
