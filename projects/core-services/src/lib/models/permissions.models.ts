export interface GetAllPermissions {
    permissions: Permission[];
}

export interface GetByIdRolePermissions {
    permissions: Permission[];
}

export interface GetByIdPermissions {
    permission: Permission[];
}

export interface Permission {
    id_permission: number;
    id_role: number;
    id_module: number;
    created: number;
    read: number;
    update: number;
    deleted: number;
    status_permission: number;
    module: Module;
    role: Role;
}

export interface Module {
    id_module: number;
    name_module: string;
}

export interface Role {
    id_role: number;
    name_role: string;
    description_role: string;
}

export interface addPermissions{
    id_role: number;
    id_module: number;
    created: number;
    read: number;
    update: number;
    deleted: number;
    status_permission: number;
}

export interface addPermissionsRes{
    msg: string;
    id: number;
}

export interface updatePermissions{
    id_role: number;
    id_module: number;
    created: number;
    read: number;
    update: number;
    deleted: number;
    status_permission: number;
}

export interface updatePermissionsRes{
    msg: string;
    permission: Permission[];
}

export interface msgPermissions{
    msg: string;
}

export interface permissionsChangeStatus{
    field: string;
    value: number;
}



