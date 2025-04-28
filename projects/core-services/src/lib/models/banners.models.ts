export interface getAllBannerRes {
    banners: banner[];
}

export interface getByIdBannerRes{
    banner: banner[];
}

export interface banner {
    id_banner: number;
    location_banner: string;
    id_category_banner: number;
    background_banner: string;
    text_banner: string;
    discount_banner: string;
    end_banner: string; // O usar tipo Date si lo conviertes
    subdomain: string;
    status_banner: number;
    create_by_banner: string;
    date_created_banner: null | string; // O Date si lo parseas
    date_updated_banner: string; // O Date
    category: category[];
    subcategory: subcategory[];
}

export interface category {
    id_category: number;
    name_category: string;
}

export interface subcategory {
    id_sub_category: number;
    name_sub_category: string;
}

export interface bannerMessage {
    msg: string;
}

export interface changeStatusBanner{
    status: number;
}