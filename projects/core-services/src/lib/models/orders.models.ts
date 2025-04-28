import { CarMetadata, ElectronicsMetadata, FashionMetadata, FoodMetadata, HealthMetadata, PetMetadata, RealEstateMetadata, ServicesMetadata } from "../types/productTypes";

export interface getAllOrdersByUserRes {
    orders: orders[]
}

export interface getByIdOrderRes {
    order: orders[]
}

export interface orders {
    warranty_order: warrantyOrder[];
    id_order: number;
    uniqid_order: string;
    id_user_order: number;
    id_store: number;
    number_order: string;
    method_order: string;
    order_status: number;
    tracking_number: string | null;
    start_date_order: string;
    end_date_order: string | null;
    whatsapp_sent: boolean;
    whatsapp_sent_at: string;
    whatsapp_message_id: string;
    total_amount: number;
    tax_amount: number;
    discount_amount: number;
    carrier_name: string | null;
    shipping_cost: number;
    shipping_date: string | null;
    status_notes: string | null;
    status_changed_at: string | null;
    items: orderItems[];
}

export interface warrantyOrder {
    hasWarranty: boolean;
    durationMonths: number;
    startDate: string;
    endDate: string;
    provider: string;
    coverage: string[];
    terms: string;
}

export interface orderItems {
    id_item: number;
    id_order: number;
    id_product: number;
    id_store: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    date_created: string;
    product: product[];
}

export interface product {
    id_product: number;
    name_product: string;
    description_product: string;
    base_price_product: number;
    subdomain: string;
    id_sub_category: number;
    id_store: number;
    metadata_product: CarMetadata[] | RealEstateMetadata[] | FashionMetadata[] | ElectronicsMetadata[] | ServicesMetadata[] | HealthMetadata[] | FoodMetadata[] | PetMetadata[];
    status_product: string;
    sku: string;
    stock: number | null;
    max_quantity: number;
    min_quantity: number;
    created_at_product: string;
    updated_at_product: string;
}


export interface deleteOrderAll {
    msg: string;
    count: number;
}

export interface deleteOrderUnique {
    msg: string;
}

export interface changeStatus{
  order_status: number;
  status_notes: string;
}

export interface changeStatusRes {
  msg: string;
  order: orders[]
  history: any;
}

export interface getItemsByIdOrder{
  items: orderItems[]
}

export interface CreateOrderDto {
  method_order: string;
  id_store: string;
  discount: number;
  items: Array<{
    id_product: string;
    id_store: string;
    quantity: number;
    unit_price: number;
  }>;
}

export interface createOrderRes{
  msg: string;
  order: orders[];
  items: orderItems[];
  summary: {
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
  }
  status: statuses[]
}

export interface statuses{
  id_status: number;
  name: string;
  description: string;
  color: string;
  is_active: boolean;
  date_created: string;
}

export interface updateOrder{
  carrier_name: string;
  shipping_date: string;
}

export interface updateOrderRes{
  msg: string;
  order: orders[];
}