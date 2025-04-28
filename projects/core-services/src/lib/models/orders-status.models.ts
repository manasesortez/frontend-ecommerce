export interface getAllStatusesRes{
    statuses: statuses[] 
}

export interface getByIdStatusRes{
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

