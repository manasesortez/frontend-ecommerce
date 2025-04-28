export interface LoginUser{
    email_user: string;
    password_user: string;
}

export interface loginUserResponse{
    token: string;
}

export interface errorLoginUser{
    msg: string;
}

export interface successLoginUser{
    msg: string
}

export interface updatePasswordUser{
    password_user: string
}

export interface activatePasswordUser{
    id_user: number;
}

export interface forgotPasswordUser{
    email_user: string;
    url: string;
}


