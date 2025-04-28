// Response Interfaces
export interface SlidesResponse {
    slides: Slide[];
}

export interface SlideResponse {
    slide: Slide;
}

export interface CreateSlideResponse {
    msg: string;
    id: number;
}

export interface UpdateSlideResponse {
    msg: string;
}

export interface DeleteSlideResponse {
    msg: string;
}

export interface ErrorResponse {
    msg: string;
    error?: any;
}

export interface GetSlideParams {
    id: string;
}

export interface GetSlidesBySubdomainParams {
    subdomain: string;
}

// Model Interface
export interface Slide {
    id_slide: number;
    background_slide: string | null;
    direction_slide: string | null;
    img_png_slide: string | null;
    coord_img_slide: string | null;
    text_slide: string | null;
    coord_text_slide: string | null;
    link_slide: string | null;
    text_btn_slide: string | null;
    subdomain: string;
    status_slide: number;
    create_by_slide: string;
    date_created_slide: string | Date | null;
    date_updated_slide: string | Date;
}

// Strict typing version
export interface StrictSlide {
    id_slide: number;
    background_slide: string;
    direction_slide: string;
    img_png_slide: string;
    coord_img_slide: string;
    text_slide: string;
    coord_text_slide: string;
    link_slide: string;
    text_btn_slide: string;
    subdomain: 'cars' | 'real-estate' | 'fashion' | 'electronics' | 'services';
    status_slide: 0 | 1; // 0=inactive, 1=active
    create_by_slide: string;
    date_created_slide: Date;
    date_updated_slide: Date;
}

