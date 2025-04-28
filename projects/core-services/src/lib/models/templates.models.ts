// Response Interfaces
export interface TemplatesResponse {
    success: boolean;
    templates: Template[];
    msg?: string;
}

export interface SingleTemplateResponse {
    success: boolean;
    template: Template;
    msg?: string;
}

export interface CreateTemplateResponse {
    success: boolean;
    msg: string;
    id?: number;
}

export interface UpdateTemplateResponse {
    success: boolean;
    msg: string;
}

export interface DeleteTemplateResponse {
    success: boolean;
    msg: string;
}

export interface TemplateErrorResponse {
    success: boolean;
    msg: string;
    error?: any;
    code?: string;
}


export interface GetTemplatesQuery {
    active_only?: boolean;
    subdomain?: string;
}

// Model Interface
export interface Template {
    id_template: number;
    logo_template?: string | null;
    icon_template?: string | null;
    cover_template?: string | null;
    title_template?: string | null;
    description_template?: string | null;
    keywords_template?: string | null;
    fonts_template?: string | null;
    colors_template?: string | null;
    subdomain: string;
    active_template?: number | null;
    date_created_template?: string | Date | null;
    date_updated_template?: string | Date;
}

// For admin operations
export interface AdminTemplateOperation {
    token: string;
}

// Type Definitions
export type TemplateSubdomain = 
    | 'cars'
    | 'real-estate'
    | 'fashion'
    | 'electronics'
    | 'services'
    | string; // Allow custom subdomains

export type TemplateImageType = 
    | 'logo'
    | 'icon'
    | 'cover';

export type TemplateStatus = 
    | 0 // Inactive
    | 1 // Active
    | number; // For potential future statuses