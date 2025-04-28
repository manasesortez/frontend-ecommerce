import { SubscriptionTransaction } from "./subscription-transactions.models";

// Response Interfaces
export interface CreatePayPalTransactionResponse {
    success: boolean;
    transactionId?: number;
    paypalOrderId?: string;
    approvalUrl?: string;
    subdomain?: string;
    plan?: {
        name: string;
        duration_days: number;
        max_products: number;
        max_editors: number;
    };
    is_sandbox?: boolean;
    msg?: string;
    code?: string;
    details?: any;
}

export interface ConfirmPaymentResponse {
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
    redirectUrl?: string;
    is_sandbox?: boolean;
    sandbox_order?: any;
    msg?: string;
    code?: string;
}

export interface PayPalErrorResponse {
    success: boolean;
    msg: string;
    code?: string;
    is_sandbox?: boolean;
    error_details?: any;
    details?: any;
}

// Request Interfaces
export interface CreatePayPalTransactionRequest {
    id_user_transaction: number;
    id_plan_transaction: number;
    subdomain: string;
    frontend_redirect_url: string;
}

export interface ConfirmPaymentRequest {
    paypal_order_id: string;
    id_user_transaction: number;
    is_sandbox?: boolean;
}

// Model Interfaces (extending from subscription_transactions with PayPal-specific fields)
export interface PayPalTransaction {
    paypal_id_transaction: string;
    data_transaction?: {
        paypal_order?: any;
        paypal_capture?: any;
        is_sandbox?: boolean;
        confirmed_at?: string;
        created_by?: string;
        type?: string;
        plan?: string;
        subdomain?: string;
    };
}

// PayPal-specific Types
export type PayPalOrderStatus = 
    | 'CREATED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'COMPLETED'
    | 'PAYER_ACTION_REQUIRED'
    | string;

export type PayPalEnvironment = 
    | 'sandbox'
    | 'live';

export type PayPalPaymentIntent = 
    | 'CAPTURE'
    | 'AUTHORIZE';