import CryptoJS from 'crypto-js';
import { Modelo_Config } from '../../Models/Modelo_Configuracao';
import { Conector_Mysql } from '../Lib/Conector_Mysql';
import { Logger } from '../Lib/Logger';

export class Config_Menus {
    private _Logger: Logger; // Instância do Logger para capturar logs
    private _BD: Conector_Mysql; // Conexão com o banco de dados MySQL
    private _Config: Modelo_Config; // Instância de configuração do sistema

    // Construtor inicializa o objeto com as configurações e a conexão ao banco de dados
    constructor(_config: Modelo_Config, _bd: Conector_Mysql) {
        this._Config = _config; // Armazena a configuração passada
        this._BD = _bd; // Armazena a conexão com o banco de dados
        this._Logger = new Logger(); // Cria uma nova instância de Logger
    }


    // /**
    //  * Adicionar um menu
    //  */
    // public Adicionar_Menus(): Promise<void> {
    //     return new Promise((resolve, rejects) => {
    //         this._Logger.Error("Ao realizar uma call nao implementada");
    //         throw "Não implementado";
    //     });
    // }
    // /**
    //  * Editar um menu
    //  */
    // public Editar_Menus(): Promise<void> {
    //     return new Promise((resolve, rejects) => {
    //         this._Logger.Error("Ao realizar uma call nao implementada");
    //         throw "Não implementado";
    //     });
    // }
    // /**
    //  * Remover um menu
    //  */
    // public Remover_Menus(): Promise<void> {
    //     return new Promise((resolve, rejects) => {
    //         this._Logger.Error("Ao realizar uma call nao implementada");
    //         throw "Não implementado";
    //     });
    // }
    /**
     * Listar os Menus de um usuário
     */
    public Listar_Menus(token_Usuario: string): Promise<Object> {
        return new Promise((resolve, rejects) => {

            /**
             * TODO: Editar SQL para somente retornar os menus que o usuário tenha permissão 
             */

            // Executa a query no banco de dados para selecionar todos os menus permitidos do usuário
            this._BD.Query('SELECT * FROM _Menus WHERE ativo = 1 AND excluido = 0;', [])
                .then((resultado) => {
                    let results_json = Object.assign([], resultado); // Converte o resultado da query em um array de objetos
                    resolve(results_json); // Retorna a lista de menus
                }).catch((err) => {
                    this._Logger.Error("ao listar menus do banco", err);
                    rejects("ao listar menus do banco");
                });
        });
    }
    /**
     * Listar todas os Menus existentes no banco sem filtro de usuario e ou estado
     */
    public Listar_Todos_Menus(): Promise<Object> {
        return new Promise((resolve, rejects) => {
            // Executa a query no banco de dados para selecionar todos os menus existentes independente de permissionamento
            this._BD.Query('SELECT * FROM _Menus;', [])
                .then((resultado) => {
                    let results_json = Object.assign([], resultado); // Converte o resultado da query em um array de objetos
                    resolve(results_json); // Retorna a lista de menus
                }).catch((err) => {
                    this._Logger.Error("ao listar menus do banco", err);
                    rejects("ao listar menus do banco");
                });
        });
    }
}


