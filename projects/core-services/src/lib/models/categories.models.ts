export interface getAllCategories{
    categories: categories[];
    fromCache: boolean;
}

export interface getByIdCategory{
    category: categories[];
    fromCache: false;
}

export interface categories{
    id_category: number;
    name_category: string;
    subdomain: string;
    parent_id: number | null;
    created_at_category: string;
    updated_at_category: string;
}

export interface msgCategories{
    msg: string;
}

export interface addCategory{
    name_category: string;
    subdomain: string;
}

export interface cotegoriesRes{
    msg: string;
    category: categories[];
}

