export interface getAllNotificationRes{
    notifications: notifications[]
}

export interface getByIdNotificationRes{
    notification: notifications[]
}

export interface notifications{
    id_notification: number;
    user_id: number;
    email: string;
    subject: string;
    message: string;
    status: string;
    attempts: number;
    date_created: string;
    date_sent: string;
}

export interface deleteNotificationAll{
    msg: string;
    count: number;
}

export interface deleteNotificationUnique{
    msg: string;
}