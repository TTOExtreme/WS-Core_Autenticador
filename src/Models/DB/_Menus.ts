
export class _Menus {
    id!: number;
    codigo!: string;
    nome!: string;
    descricao!: string;
    menu_pai!: string;
    versao!: string;
    permissao!: string;
    modulo!: string;
    evento!: string; // Qual evento será disparado caso clicar nesse menu
    load_dependencia!: string; // Qual dependencia deverá ser carregada antes do disparo de um evento
    configuracao!: string; // Dados de configuração que serão enviados tanto no evento quanto no carregamento da dependencia
    configuracao_JSON!: Object;
    ativo!: boolean;
    excluido!: boolean;
}


/**
 * Contem a lista de permissoes a ser instanciada / carregada no servidor
 */
export class _Menus_Lista {
    Lista: Array<_Menus>;

    constructor() {
        this.Lista = new Array<_Menus>();

        /**
         * IDS DE PERMISSÃO SOMENTE SIMBOLICOS, OS MESMOS DEVERAM SER GERADOS PELO 
         * BANCO DE DADOS
         */
        let id_menu = 0;




        /**
         * ===================================================================================================================
         * Bloco de menus referente aos controles de cadastros do módulo de autenticação
         * ===================================================================================================================
         */
        this.Lista.push({
            id: id_menu++,
            codigo: "menu/controle",
            nome: "Controle Cadastros",
            descricao: "Controle de cadastros da plataforma.",
            menu_pai: "",
            versao: "0.0.1",
            permissao: "tela/usuarios/controle",
            modulo: "WSCore_Autenticador",
            evento: "menu/open/controle/usuarios",
            load_dependencia: "./modulo/autenticador/js/Usuarios.js",
            configuracao: "{}",
            configuracao_JSON: {},
            ativo: true,
            excluido: false
        })
        this.Lista.push({
            id: id_menu++,
            codigo: "menu/controle/usuarios",
            nome: "Usuários",
            descricao: "Controle de usuários de acesso a plataforma.",
            menu_pai: "menu/controle",
            versao: "0.0.1",
            permissao: "tela/usuarios/controle",
            modulo: "WSCore_Autenticador",
            evento: "menu/open/controle/usuarios",
            load_dependencia: "./modulo/autenticador/js/Usuarios.js",
            configuracao: "{}",
            configuracao_JSON: {},
            ativo: true,
            excluido: false
        })
        this.Lista.push({
            id: id_menu++,
            codigo: "menu/controle/grupos",
            nome: "Usuários",
            descricao: "Controle de usuários de acesso a plataforma",
            menu_pai: "menu/controle",
            versao: "0.0.1",
            permissao: "tela/grupos/controle",
            modulo: "WSCore_Autenticador",
            evento: "menu/open/controle/grupos",
            load_dependencia: "./modulo/autenticador/js/Grupos.js",
            configuracao: "{}",
            configuracao_JSON: {},
            ativo: true,
            excluido: false
        })
        this.Lista.push({
            id: id_menu++,
            codigo: "menu/controle/perfis",
            nome: "Usuários",
            descricao: "Controle de usuários de acesso a plataforma",
            menu_pai: "menu/controle",
            versao: "0.0.1",
            permissao: "tela/perfis/controle",
            modulo: "WSCore_Autenticador",
            evento: "menu/open/controle/perfis",
            load_dependencia: "./modulo/autenticador/js/Perfis.js",
            configuracao: "{}",
            configuracao_JSON: {},
            ativo: true,
            excluido: false
        })
        this.Lista.push({
            id: id_menu++,
            codigo: "menu/controle/favoritos",
            nome: "Usuários",
            descricao: "Controle de usuários de acesso a plataforma",
            menu_pai: "",
            versao: "0.0.1",
            permissao: "tela/usuarios/favoritos",
            modulo: "WSCore_Autenticador",
            evento: "menu/open/controle/favoritos",
            load_dependencia: "./modulo/autenticador/js/Favoritos.js",
            configuracao: "{}",
            configuracao_JSON: {},
            ativo: true,
            excluido: false
        })
        this.Lista.push({
            id: id_menu++,
            codigo: "menu/controle/favoritos-global",
            nome: "Usuários",
            descricao: "Controle de usuários de acesso a plataforma",
            menu_pai: "menu/controle",
            versao: "0.0.1",
            permissao: "tela/usuario/favoritos-global",
            modulo: "WSCore_Autenticador",
            evento: "menu/open/controle/favoritos-global",
            load_dependencia: "./modulo/autenticador/js/favoritos-global.js",
            configuracao: "{}",
            configuracao_JSON: {},
            ativo: true,
            excluido: false
        })
    }
}