
export class _Usuarios {
    id!: number;
    nome!: string;
    nome_social!: string;
    usuario!: string;
    senha!: string;
    email!: string;
    preferencias!: string;
    preferencias_JSON!: object;
    data_login!: Date;
    data_logout!: Date;
    token!: string;
    data_token!: Date;
    is_api!: boolean;
    criado_em!: Date;
    criado_por!: number;
    editado_em!: Date;
    editado_por!: number;
    excluido_em!: Date;
    excluido_por!: number;
    ativado_em!: Date;
    ativado_por!: number;
    inativado_em!: Date;
    inativado_por!: number;
    ativo!: boolean;
    excluido!: boolean;
}

export class _UserLogin {
    Usuario!: string;
    Senha!: string;
    timestamp!: number;
    token!: string;
}