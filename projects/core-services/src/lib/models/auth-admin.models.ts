export interface LoginAdmin{
    email_admin: string;
    password_admin: string;
}

export interface loginAdminResponse{
    token: string;
    user: user[]
}

export interface user{
    id: number,
    name: string,
    role: string,
    is_store_owner: boolean
}

export interface errorLoginAdmin{
    msg: string;
}

export interface successLoginAdmin{
    msg: string
}

export interface updatePasswordAdmin{
    password_admin: string
}

export interface activatePasswordAdmin{
    id_admin: number;
}

export interface forgotPasswordadmin{
    email_admin: string;
    url: string;
}


