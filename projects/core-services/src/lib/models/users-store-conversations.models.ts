// Response Interfaces
export interface UserStoreConversationsResponse {
    success: boolean;
    conversations: UserStoreConversationWithPreview[];
    msg?: string;
}

export interface SingleConversationResponse {
    success: boolean;
    conversation: UserStoreConversationWithMessages;
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

export interface RatingResponse {
    success: boolean;
    msg: string;
}

export interface ErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
    code?: string;
}

export interface UpdateConversationRequest {
    status?: 'open' | 'pending' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AddRatingRequest {
    rating: number;
    feedback: string;
}

export interface GetConversationsQuery {
    status?: 'open' | 'pending' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    sort?: 'date_created' | 'priority';
    order?: 'ASC' | 'DESC';
}

// Model Interfaces
export interface UserStoreConversation {
    id_conversation: number;
    id_order?: number | null;
    id_user: number;
    id_store: number;
    id_store_owner: number;
    subdomain: string;
    subject: string;
    status: 'open' | 'pending' | 'resolved' | 'closed';
    user_rating?: number | null;
    user_feedback?: string | null;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    related_product?: number | null;
    date_created?: Date | string;
    date_updated?: Date | string;
}

export interface UserStoreConversationWithPreview extends UserStoreConversation {
    messages?: UserStoreMessage[]; // Only the first message for preview
}

export interface UserStoreConversationWithMessages extends UserStoreConversation {
    messages: UserStoreMessage[];
}

export interface UserStoreMessage {
    id_message: number;
    id_conversation: number;
    id_sender: number;
    sender_role: 'user' | 'store_owner';
    message: string;
    attachments?: string | null;
    is_read: boolean;
    date_created?: Date | string;
}

// For user operations
export interface UserConversationOperation {
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

export type ConversationPriority = 
    | 'low'
    | 'medium'
    | 'high'
    | 'urgent';

export type SenderRole = 
    | 'user'
    | 'store_owner';