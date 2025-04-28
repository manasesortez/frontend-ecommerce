// Response Interfaces
export interface SubscriptionTransactionsResponse {
    transactions: SubscriptionTransaction[];
    success?: boolean;
    msg?: string;
}

export interface SingleTransactionResponse {
    transaction: SubscriptionTransactionWithRelations;
    success?: boolean;
    msg?: string;
}

export interface CreateTransactionResponse {
    success: boolean;
    transactionId?: number;
    subdomain?: string;
    plan?: {
        name: string;
        duration_days: number;
        max_products: number;
        max_editors: number;
    };
    accessDetails?: {
        grantedAt: Date;
        expiresAt: Date;
        isActive: boolean;
    };
    userStatus?: {
        isStoreAdmin: boolean;
        subscriptionActive: boolean;
    };
    msg?: string;
    code?: string;
    details?: any;
}

export interface UpdateTransactionResponse {
    success: boolean;
    msg: string;
}

export interface DeleteTransactionResponse {
    success: boolean;
    msg: string;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
    code?: string;
    error?: any;
    details?: any;
}

// Request Interfaces
export interface CreateTransactionRequest {
    id_user_transaction: number;
    id_plan_transaction: number;
    paypal_id_transaction: string;
    amount_transaction: number;
    subdomain: string;
    status_transaction: string;
    frontend_redirect_url: string;
}

export interface UpdateTransactionRequest {
    status_transaction?: string;
    data_transaction?: string;
}

export interface GetTransactionsQuery {
    page?: string;
    limit?: string;
}

// Model Interfaces
export interface SubscriptionTransaction {
    id_transaction: number;
    id_user_transaction: number;
    id_plan_transaction: number;
    paypal_id_transaction: string;
    amount_transaction: number;
    subdomain: string;
    status_transaction: string;
    data_transaction?: string | null;
    date_created_transaction?: string | null;
    date_updated_transaction?: string | null;
}

export interface SubscriptionTransactionWithRelations extends SubscriptionTransaction {
    user?: {
        id_user: number;
        name_user: string;
        email_user: string;
    };
    plan?: {
        id_plan: number;
        name_plan: string;
        duration_plan: number;
        max_products_plan: number;
        max_editors: number;
    };
}

// For admin operations
export interface AdminTransactionOperation {
    token: string;
}

// For user operations
export interface UserTransactionOperation {
    token: string;
}

// Type Definitions
export type TransactionStatus = 
    | 'pending'
    | 'completed'
    | 'failed'
    | 'refunded'
    | 'cancelled'
    | string; // Allow custom statuses

export type TransactionType = 
    | 'new_subscription'
    | 'renewal'
    | 'upgrade'
    | 'downgrade'
    | 'one_time'
    | string; // Allow custom types