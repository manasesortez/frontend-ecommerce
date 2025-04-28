export interface PriceHistoryResponse {
    history: PriceHistory[];
}

export interface PriceHistory {
    id_history: number;
    id_product: number;
    price: number;
    previous_price: number;
    change_reason: string;
    changed_by: number;
    change_type: 'manual' | 'automatic' | 'promotion' | string; // Add other possible types
    date_created: string; // or Date if you'll parse it
    admin: Admin;
    product: ProductHistory;
}

export interface Admin {
    id_admin: number;
    name_admin: string;
    email_admin: string;
}

export interface ProductHistory {
    id_product: number;
    name_product: string;
    base_price_product: number;
    subdomain: string;
}

export interface StockHistoryResponse {
    history: StockHistory[];
}

export interface StockHistory {
    id_history: number;
    id_product: number;
    stock_quantity: number;
    stock_change: number;
    change_reason: string;
    changed_by: number;
    related_order: number | null;
    date_created: string; // or Date if you'll parse it
    admin: Admin;
    order: any;
    product: ProductHistory[];
}

export interface Admin {
    id_admin: number;
    name_admin: string;
    email_admin: string;
}