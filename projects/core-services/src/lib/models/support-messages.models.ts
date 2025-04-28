import { SupportConversation } from "./support-conversations.models";

// Response Interfaces
export interface SendMessageResponse {
    success: boolean;
    msg: string;
    message?: SupportMessage;
}

export interface MarkMessagesReadResponse {
    success: boolean;
    msg: string;
}

export interface UnreadMessagesCountResponse {
    success: boolean;
    unreadCount: number;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
}

export interface GetUnreadMessagesQuery {
    conversationId?: string;
}

// Model Interface
export interface SupportMessage {
    id_message: number;
    id_conversation: number;
    id_sender: number;
    sender_role: 'superadmin' | 'store_owner';
    message: string;
    attachments?: string | null;
    is_read: 0 | 1;
    date_created?: string | null;
}

export interface SupportMessageWithConversation extends SupportMessage {
    conversation?: SupportConversation;
}

// For admin operations
export interface AdminMessageOperation {
    token: string;
}

// For store owner operations
export interface StoreOwnerMessageOperation {
    token: string;
}

// Type Definitions
export type MessageStatus = 
    | 'unread'
    | 'read';

export type SenderRole = 
    | 'superadmin'
    | 'store_owner';

export type AttachmentType = 
    | 'image'
    | 'document'
    | 'video'
    | 'other';