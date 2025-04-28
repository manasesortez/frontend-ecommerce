export interface getAllConversationTagsRelationsRes{
    relations: relations[]
}

export interface getByIdConversationTagsRelationsRes{
    relation: relations[]
}

export interface relations{
    id_relation: number;
    id_conversation: number;
    id_tag: number;
    user_store_conversation: user_store_conversation[];
    conversation_tag: conversation_tag[]
}

export interface user_store_conversation{
    id_conversation: number;
    id_order: number;
    id_user: number;
    id_store: number;
    id_store_owner: number;
    subdomain: string;
    subject: string;
    status: string;
    user_rating: number
    user_feedback: string;
    priority: string;
    related_product: number;
    date_created: string;
    date_updated: string;
}

export interface conversation_tag{
    id_tag: number;
    tag_name: string;
    tag_color: string;
}

