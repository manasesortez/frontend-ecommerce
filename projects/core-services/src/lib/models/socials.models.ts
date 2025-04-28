// Response Interfaces
export interface SocialsResponse {
    socials: Social[];
}

export interface SocialResponse {
    social: Social;
}

export interface CreateSocialResponse {
    msg: string;
    id: number;
}

export interface UpdateSocialResponse {
    msg: string;
}

export interface DeleteSocialResponse {
    msg: string;
}

export interface ErrorResponse {
    msg: string;
    error?: any;
}

// Request Interfaces
export interface CreateSocialRequest {
    name_social: string;
    url_social: string;
    icon_social?: string;
    color_social?: string;
    subdomain: string;
}

export interface UpdateSocialRequest {
    name_social?: string;
    url_social?: string;
    icon_social?: string;
    color_social?: string;
    subdomain?: string;
}

export interface GetSocialParams {
    id: string;
}

export interface GetSocialsBySubdomainParams {
    subdomain: string;
}

// Model Interface
export interface Social {
    id_social: number;
    name_social: string;
    url_social: string;
    icon_social: string | null;
    color_social: string | null;
    subdomain: string;
    create_by_social: string;
    date_created_social: string | Date | null;
    date_updated_social: string | Date;
}

// Strict typing version
export interface StrictSocial {
    id_social: number;
    name_social: string;
    url_social: string;
    icon_social: string;
    color_social: string;
    subdomain: 'cars' | 'real-estate' | 'fashion' | 'electronics' | 'services' | string;
    create_by_social: string;
    date_created_social: Date;
    date_updated_social: Date;
}

// For admin operations
export interface AdminSocialOperation {
    token: string;
}