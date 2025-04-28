// Response Interfaces
export interface SupportConversationsResponse {
    conversations: SupportConversationWithPreview[];
    success?: boolean;
    msg?: string;
}

export interface SingleConversationResponse {
    conversation: SupportConversationWithMessages;
    success?: boolean;
    msg?: string;
}

export interface CreateConversationResponse {
    success: boolean;
    msg: string;
    id?: number;
}

export interface UpdateConversationResponse {
    success: boolean;
    msg: string;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
}

export interface UpdateConversationStatusRequest {
    status: 'open' | 'pending' | 'resolved' | 'closed';
}

export interface AssignAdminRequest {
    id_admin: number;
}

export interface GetConversationsQuery {
    status?: 'open' | 'pending' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    sort?: 'date_created' | 'priority';
    order?: 'ASC' | 'DESC';
}

// Model Interfaces
export interface SupportConversation {
    id_conversation: number;
    id_store: number;
    id_admin?: number | null;
    subject: string;
    status: 'open' | 'pending' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    id_plan?: number | null;
    date_created?: string | null;
    date_updated?: string | null;
}

export interface SupportConversationWithPreview extends SupportConversation {
    messages?: SupportMessage[]; // Only the first message for preview
}

export interface SupportConversationWithMessages extends SupportConversation {
    messages: SupportMessage[];
}

export interface SupportMessage {
    id_message: number;
    id_conversation: number;
    id_sender: number;
    sender_role: 'store_owner' | 'superadmin';
    message: string;
    attachments?: string | null;
    is_read: 0 | 1;
    date_created?: string | null;
}

// For admin operations
export interface AdminConversationOperation {
    token: string;
}

// For store owner operations
export interface StoreOwnerConversationOperation {
    token: string;
}

// Type Definitions
export type ConversationStatus = 
    | 'open'
    | 'pending'
    | 'resolved'
    | 'closed';

export type PriorityLevel = 
    | 'low'
    | 'medium'
    | 'high'
    | 'urgent';

export type SenderRole = 
    | 'store_owner'
    | 'superadmin';