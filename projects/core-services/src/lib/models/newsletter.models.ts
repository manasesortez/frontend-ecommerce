export interface subscribersRes{
    subscribers: subscribers[]
    fromCache: boolean;
    pagination: {
      page: number
      pageSize: number
      total: number
    }
}

export interface subscribers{
    id_subscriber: number;
    email: string;
    name: string;
    country: string;
    department: string;
    city: string;
    subscribed_at: string;
    is_active: boolean;
}

export interface newsletterMessage{
    msg: string;
}

export interface templatesRes{
    templates: templates[]
}

export interface templates{
    id_template: number;
    name: string;
    subject: string;
    content: string;
    created_by: number;
    is_active: boolean;
    tags: string;
    preview_text: string;
    segment_criteria: string;
    created_at: string;
    updated_at: string;
}

export interface campaignsRes{
    campaigns: campaigns[]
}

export interface campaigns{
    id_campaign: number;
    id_template: number;
    subject: string;
    content: string;
    created_by: number;
    scheduled_at: string;
    status: string;
    sent_at: string;
    total_recipients: number;
    opened_count: number;
    clicked_count: number;
    unsubscribed_count: number;
    bounced_count: number;
    segment_criteria: {
        location:{
            city: string;
            country: string;
            department: string;
        },
        subscription_date: {
            end: string;
            start: string;
        }
    },
    custom_headers: string;
    created_at: string;
    updated_at: string;
    template: {
        name: string;
    }
}

export interface addSubscribe{
    email: string;
    name: string;
}

export interface addSubscribeRes{
    msg: string;
    newSubscriber: {
        subscribed_at: string;
        is_active: boolean;
        id_subscriber: number;
        email: string;
        name: string;
        country: string;
        department: string;
        city: string;
        token: string;
        confirmed: boolean;
        confirmation_sent_at: string;
    }
}

export interface unSubscribe{
    email: string;
}

export interface unSubscribeRes{
    msg: string;
}

export interface addTemplate{
    name: string;
    subject: string;
    content: string;
    preview_text: string;
    tags: string;
}

export interface addTemplateRes{
    msg: string;
    template: templates[]
}

export interface addCampaign{
    id_template: number;
    subject: string;
    content: string;
    scheduled_at: string;
    segment_criteria: {
        location:{
            country: string,
            city: string,
            department: string;
        },
        subscription_date: {
            end: string;
            start: string;
        }
    }
}

export interface addCampaignRes{
    msg: string;
    scheduled: string;
}

