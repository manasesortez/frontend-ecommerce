// Response Interfaces
export interface SubscriptionLogsResponse {
    logs: SubscriptionLog[];
    success?: boolean;
    msg?: string;
}

export interface SubscriptionLogWithRelations extends SubscriptionLog {
    user?: {
        id_user: number;
        name_user: string;
        email_user: string;
    };
    plan?: {
        id_plan: number;
        name_plan: string;
    };
}

export interface DeleteLogsResponse {
    success: boolean;
    message: string;
    deleted_count?: number;
    error_code?: string;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    error_code?: string;
    error?: any;
}

// Request Interfaces
export interface GetLogsQuery {
    page?: string;
    limit?: string;
    userId?: string;
    planId?: string;
}

export interface DeleteLogsParams {
    id?: string; // For future single log deletion
}

// Model Interface
export interface SubscriptionLog {
    id_log: number;
    id_user: number | null;
    id_plan: number | null;
    action: string | null;
    details: string | null;
    log_date: string | Date | null;
}

// For admin operations
export interface AdminOperation {
    token: string;
}

// For store owner operations
export interface StoreOwnerOperation {
    token: string;
}

// Type Definitions
export type LogAction = 
    | 'subscription_start'
    | 'subscription_end'
    | 'plan_change'
    | 'payment_processed'
    | 'store_created'
    | 'admin_action'
    | string; // Allow custom actions