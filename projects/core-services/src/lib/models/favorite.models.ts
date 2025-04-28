export interface getAllFavoritesRes{
    favorites: favorites[]
}

export interface getByIdFavoritesRes{
    favorite: favorites[]
}

export interface favorites{
    id_favorite: number;
    id_user_favorite: number;
    id_product_favorite: number;
    date_created_favorite: string;
    date_updated_favorite: string;
    product: product[];
}

export interface product{
    id_product: number;
    name_product: string;
    base_price_product: number;
    subdomain: string;
}

export interface addFavorite{
    id_product_favorite: number;
}

export interface addFavoriteRes{
    msg: string;
    favorite: favorites[]
}

export interface msgFavorite{
    msg: string;
}