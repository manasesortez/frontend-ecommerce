export interface RatingsResponse {
    ratings: RatingUser[];
}

export interface StoreRatingsResponse {
    ratings: StoreRating[];
}

export interface addRatingUser{
    rating: number;
    comment: string;
}

export interface StoreRating {
    id_rating: number;
    id_order: number;
    id_store: number;
    id_user: number;
    rating: number;
    comment: string;
    response: string | null;
    date_created: string; // or Date
    date_updated: string; // or Date
    user: {
        id_user: number;
        name_user: string;
        image_user: string;
    };
    order: {
        id_order: number;
        number_order: string;
        method_order: string;
        total_amount: number;
        tax_amount: number;
        discount_amount: number;
    };
}

export interface RatingUser {
    id_rating: number;
    id_order: number;
    id_user: number;
    id_store: number;
    rating: number;
    comment: string | null;
    date_created: string;
    date_updated: string;
    store: StoreInfo;
    order: OrderInfo;
}

export interface StoreInfo {
    id_store: number;
    name_store: string;
    logo_store: string | null;
}

export interface OrderInfo {
    id_order: number;
    number_order: string;
    method_order: string;
    total_amount: number;
    tax_amount: number;
    discount_amount: number;
}

export interface responseUpdate{
    response: string;
}

export interface msgRating{
    msg: string;
    rating: rating[]
}

export interface rating{
    date_created: Date; // Parsed as Date object
    date_updated: Date; // Parsed as Date object
    id_rating: number;
    id_order: number; // Numeric ID version
    id_user: number;
    id_store: number;
    rating: 1 | 2 | 3 | 4 | 5; // Strict rating values
    comment: string;
}

export interface StoreRatingStats {
    id_store: string; // or number if it should be numeric
    total_ratings: number;
    average_rating: string; // Formatted as "4.5"
    rating_distribution: {
        five_stars: number;
        four_stars: number;
        three_stars: number;
        two_stars: number;
        one_stars: number;
    };
}