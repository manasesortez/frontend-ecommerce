// Response Interfaces
export interface WhatsAppQRResponse {
    status: 'qr_required' | 'ready' | 'pending' | 'error';
    qrCode?: string;
    message: string;
}

export interface WhatsAppStatusResponse {
    storeId: string;
    ready: boolean;
    qrCode?: string;
    status: 'ready' | 'authentication_required' | 'initializing';
    message: string;
}

export interface WhatsAppErrorResponse {
    status: 'error';
    message: string;
    error?: any;
}

// Request Interfaces
export interface GetWhatsAppQRParams {
    id: string; // storeId
}

export interface GetWhatsAppStatusParams {
    id: string; // storeId
}

// Type Definitions
export type WhatsAppClientStatus = 
    | 'initializing'
    | 'qr_required'
    | 'authenticating'
    | 'ready'
    | 'disconnected'
    | 'error';

export type WhatsAppQRStatus = 
    | 'qr_required'
    | 'ready'
    | 'pending';

// Service Status Interface
export interface WhatsAppClientData {
    isReady: boolean;
    qrCode?: string;
    status: WhatsAppClientStatus;
}