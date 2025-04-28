export interface getAllAdmin{
    admin: admin[]
}

export interface getByIdAdmin{
    admin: admin[]
}

export interface admin {
    id_admin: number;
    id_role: number;
    name_admin: string;
    email_admin: string;
    image_admin: string | null;
    token_exp_admin: string | null;
    status_admin: number;
    date_created_admin: string; // or use Date if you'll convert it
    date_updated_admin: string; // or use Date if you'll convert it
    created_by: number;
    created_by_admin: string;
    created_editors_count: number;
    max_editors_allowed: number;
    role: role[]
}

export interface role{
    id_role: number;
    name_role: string;
    description_role: string;
}

export interface errorAdmin{
    msg: string;
}

export interface deleteAdmin{
    msg: string;
}