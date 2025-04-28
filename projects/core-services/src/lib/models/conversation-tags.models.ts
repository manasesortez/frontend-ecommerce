export interface getAllConversationTags{
    tags: tags[]
}

export interface getByIdConversationTags{
    tag: tags[]
}

export interface tags{
    id_tag: number,
    tag_name: string;
    tag_color: string;
}

export interface msgConversationTag{
    msg: string;
}

export interface addConversationTag{
    tag_name: string;
    tag_color: string;
}

export interface conversationTagRes{
    tag: tags[]
}
