export interface ProductImages {
    images: Image[];
}

export interface Image {
    id_image: number;
    id_product: number;
    id_store: number;
    subdomain: string;
    image_type: string; // or more specific type like 'gallery' | 'thumbnail' | 'main' if you know all possible values
    file_name: string;
    file_size_mb: number;
    file_type: string; // or more specific type like 'jpg' | 'png' | 'webp' | 'gif'
    dimensions: string;
    alt_text: string;
    display_order: number;
    is_optimized: boolean;
    optimized_path: string;
    created_by: number;
    status_image: string; // or more specific type like 'active' | 'inactive' | 'deleted'
    date_created: string; // or Date if you'll parse it
    date_updated: string; // or Date if you'll parse it
}

export interface msgImageProduct{
    msg: string;
}