export interface getAllCartsByUser{
    carts: CartItem[]
}

export interface CartItem {
    id_cart: number;
    id_user_cart: number;
    id_product_cart: number;
    id_store: number;
    subdomain: string;
    quantity_cart: number;
    price_cart: number; // o `string` si manejas formato monetario
    ref_cart: string;
    order_cart: string;
    method_cart: 'CASH' | 'CARD' | 'TRANSFER' | string; // Enum si hay valores fijos
    date_created_cart: string; // o Date si lo conviertes
    date_updated_cart: string; // o Date
    user: User;
    store: Store | null; // Puede ser null
    product: Product;
}

export interface User {
    id_user: number;
    name_user: string;
    email_user: string;
}

export interface Store {
    id_store?: number;
    name_store?: string;
}

export interface Product {
    id_product: number;
    name_product: string;
    base_price_product: number;
    subdomain: string;
}

export interface messageCart{
    msg: string
}

export interface addCart{
    id_product_cart: number;
    id_store: number;
    subdomain: string;
    quantity_cart: number;
    price_cart: number;
}

export interface cartRes{
    msg: string;
    cart: CartItem[]
    updatedStock: number | null;
}

export interface updateCart{
    id_product_cart: number;
    subdomain: string;
    quantity_cart: number;
    price_cart: number;
}