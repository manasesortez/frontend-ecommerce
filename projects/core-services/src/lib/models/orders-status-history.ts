export interface StatusHistoryRes {
    statusHistory: StatusHistory[];
}

export interface StatusHistory {
    id_history: number;
    id_order: number;
    id_status: number;
    changed_by: number;
    notes: string;
    date_created: string;
    order: Order;
    changedByAdmin: ChangedByAdmin;
}

export interface Order {
    warranty_order: WarrantyOrder[];
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
    whatsapp_sent_at: string | null;
    whatsapp_message_id: string | null;
    total_amount: number;
    tax_amount: number;
    discount_amount: number;
    carrier_name: string;
    shipping_cost: number;
    shipping_date: string;
    status_notes: string;
    status_changed_at: string;
}

export interface WarrantyOrder {
    hasWarranty: boolean;
    durationMonths: number;
    startDate: string;
    endDate: string;
    provider: string;
    coverage: string[];
    terms: string;
}

export interface ChangedByAdmin {
    name_admin: string;
    email_admin: string;
}