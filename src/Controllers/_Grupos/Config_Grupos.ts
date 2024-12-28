import CryptoJS from 'crypto-js';
import { Modelo_Config } from '../../Models/Modelo_Configuracao';
import { Conector_Mysql } from '../Lib/Conector_Mysql';
import { Logger } from '../Lib/Logger';

export class Config_Grupos {
    private _Logger: Logger; // Instância do Logger para capturar logs
    private _BD: Conector_Mysql; // Conexão com o banco de dados MySQL
    private _Config: Modelo_Config; // Instância de configuração do sistema

    // Construtor inicializa o objeto com as configurações e a conexão ao banco de dados
    constructor(_config: Modelo_Config, _bd: Conector_Mysql) {
        this._Config = _config; // Armazena a configuração passada
        this._BD = _bd; // Armazena a conexão com o banco de dados
        this._Logger = new Logger(); // Cria uma nova instância de Logger
    }


    /**
     * Adicionar um grupo a um usuário
     */
    public Adicionar_Grupos(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Editar um grupo a um usuário
     */
    public Editar_Grupos(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Remover um grupo a um usuário
     */
    public Remover_Grupos(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Listar os Grupos de um usuário
     */
    public Listar_Grupos(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Listar todas os Grupos existentes no banco sem filtro de usuario
     */
    public Listar_Todos_Grupos(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
}


