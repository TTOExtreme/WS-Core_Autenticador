import CryptoJS from 'crypto-js';
import { Modelo_Config } from '../../Models/Modelo_Configuracao';
import { Conector_Mysql } from '../Lib/Conector_Mysql';
import { Logger } from '../Lib/Logger';

export class Config_Permissoes {
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
     * Adicionar uma permissao a um usuário
     */
    public Adicionar_Permissoes(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Editar uma permissao a um usuário
     */
    public Editar_Permissoes(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Remover uma permissao a um usuário
     */
    public Remover_Permissoes(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Listar as permissoes de um usuário
     */
    public Listar_Permissoes(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Listar todas as permissoes existentes no banco sem filtro de usuario
     */
    public Listar_Todos_Permissoes(): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._Logger.Error("Ao realizar uma call nao implementada");
            throw "Não implementado";
        });
    }
    /**
     * Realiza a consulta se o usuario possui uma permissao especifica
     */
    public Autorizar(Id_Usuario: number, Permissao: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this._Logger.Error("Realizando uma Call Nao implementada, Autorizando inicialmente:", "Call: Autorizar() Classe: _Config_Permissoes");

            resolve();
            // throw "Não implementado";
            return;

            //Caso de Reject usar o modelo de retorno abaixo
            reject({
                mensagem: "Usuário sem permissão para a ação",
                dadosAdicionais: "Permissão: " + Permissao
            })
        });
    }
}


