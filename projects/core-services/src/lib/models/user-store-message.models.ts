import { UserStoreConversation } from "./users-store-conversations.models";

// Response Interfaces
export interface SendMessageResponse {
    success: boolean;
    msg: string;
    message?: UserStoreMessage;
}

export interface UnreadMessagesResponse {
    success: boolean;
    unreadCount: number;
    msg?: string;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
    code?: string;
}


export interface GetMessagesQuery {
    read_status?: 'read' | 'unread';
    sort?: 'date_created' | 'priority';
    order?: 'ASC' | 'DESC';
}

// Model Interface
export interface UserStoreMessage {
    id_message: number;
    id_conversation: number;
    id_sender: number;
    sender_role: 'user' | 'store_owner';
    message: string;
    attachments?: any | null; // JSON type for attachments
    is_read: boolean;
    date_created?: Date | string;
}

export interface UserStoreMessageWithConversation extends UserStoreMessage {
    conversation?: UserStoreConversation;
}

// For user operations
export interface UserMessageOperation {
    token: string;
}

// For store owner operations
export interface StoreOwnerMessageOperation {
    token: string;
}

// Type Definitions
export type MessageStatus = 
    | 'read'
    | 'unread';

export type SenderRole = 
    | 'user'
    | 'store_owner';

export type AttachmentType = 
    | 'image'
    | 'document'
    | 'video'
    | 'other';