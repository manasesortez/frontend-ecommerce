export interface getAllModulesRes{
    modules: modules[]
}

export interface getByIdModuleRes{
    module: modules[]
}

export interface modules{
    id_module: number;
    name_module: string;
    date_created_module: string;
    date_update_module: string;
}

export interface addModules{
    name_module: string;
}

export interface addModulesResponse{
    msg: string;
    id: number;
}


