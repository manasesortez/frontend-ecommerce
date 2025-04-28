export interface ProductComments {
    comments: Comment[];
}

export interface CommentResponse {
    comment: Comment;
}

export interface Comment {
    id_comment: number;
    id_product: number;
    id_user: number;
    parent_comment: number;
    comment_text: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected' | 'spam'; // Add other possible statuses
    is_verified_purchase: boolean;
    admin_notes: string | null;
    likes_count: number;
    reports_count: number;
    date_created: string; // or Date
    date_updated: string; // or Date
    date_approved: string | null; // or Date | null
    user: User;
    product: Product;
    replies: Reply[];
    parentComment: ParentComment | null; // Made optional as it might not always exist
}

export interface Reply {
    id_comment: number;
    id_product: number;
    id_user: number;
    parent_comment: number;
    comment_text: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected' | 'spam';
    is_verified_purchase: boolean;
    admin_notes: string | null;
    likes_count: number;
    reports_count: number;
    date_created: string;
    date_updated: string;
    date_approved: string | null;
    user: User;
}

export interface ParentComment {
    id_comment: number;
    id_product: number;
    id_user: number;
    parent_comment: number;
    comment_text: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected' | 'spam';
    is_verified_purchase: boolean;
    admin_notes: string | null;
    likes_count: number;
    reports_count: number;
    date_created: string;
    date_updated: string;
    date_approved: string | null;
    user: User;
}

export interface User {
    id_user: number;
    name_user: string;
    image_user: string;
}

export interface Product {
    id_product: number;
    name_product: string;
}

export interface addProductComment{
    id_product: number;
    comment_text: string;
    rating: number;
    parent_comment: number;
}

export interface updateProductsComments{
    comment_text: string;
    rating: number;
}

export interface ProductCommentsMsg{
    msg: string;
    comment: Comment[]
    likes_count: number;
}

export interface changeStatus{
    status: string;
    admin_notes: string;
}

export interface reportComments{
    reason: string;
}

export interface reportCommentsMsg{
    msg: string;
    reports_count: number;
    status: string;
}



