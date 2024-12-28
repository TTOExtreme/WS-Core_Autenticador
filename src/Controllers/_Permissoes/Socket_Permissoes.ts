import { Modelo_Config } from "../../Models/Modelo_Configuracao";
import { Pacotes_Socket } from "../../Models/Modulos/Pacotes_Socket";
import { Conector_Mysql } from "../Lib/Conector_Mysql";
import { Logger } from "../Lib/Logger";
import { Socket_Client } from "../Modulos/Socket_Client";



export class Socket_Permissoes {
    private _Logger: Logger; // Instância do Logger para capturar logs
    private _BD: Conector_Mysql; // Conexão com o banco de dados MySQL
    private _Config: Modelo_Config; // Instância de configuração do sistema
    private _Core_Conection: Socket_Client; // instancia de comunicação socket com o Core
    private _Permissoes: any; // instancia da classe de controle de permissoes

    // Construtor inicializa o objeto com as configurações e a conexão ao banco de dados
    constructor(_config: Modelo_Config, _bd: Conector_Mysql, _core_conection: Socket_Client) {
        this._Config = _config; // Armazena a configuração passada
        this._BD = _bd; // Armazena a conexão com o banco de dados
        this._Core_Conection = _core_conection;
        this._Logger = new Logger(); // Cria uma nova instância de Logger

        /**
         * TODO Classe de controle de permissoes
         */
        this._Permissoes = null;
    }

    /**
     * Inicializa os listeners para receber requests e responder via socket
     */
    Inicializar_Listeners() {
        // Adiciona os listeners de eventos do Socket
        this._Core_Conection.socketClient.on("permissao/Listar", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            this._Logger.Error("Ao realizar uma call nao implementada", dadosRetorno);
            throw "Não Implementado"
        })
        // Adiciona os listeners de eventos do Socket
        this._Core_Conection.socketClient.on("permissao/Adicionar", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            this._Logger.Error("Ao realizar uma call nao implementada", dadosRetorno);
            throw "Não Implementado"
        })
        // Adiciona os listeners de eventos do Socket
        this._Core_Conection.socketClient.on("permissao/Editar", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            this._Logger.Error("Ao realizar uma call nao implementada", dadosRetorno);
            throw "Não Implementado"
        })
        // Adiciona os listeners de eventos do Socket
        this._Core_Conection.socketClient.on("permissao/Remover", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            this._Logger.Error("Ao realizar uma call nao implementada", dadosRetorno);
            throw "Não Implementado"
        })
    }
}