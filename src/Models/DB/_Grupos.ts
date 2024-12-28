

export class _Grupos{
    id!: number;
    nome!: string;
    descricao!: string;
    grupo_pai!: number;
    cor!: string;
    sigla!: string;
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