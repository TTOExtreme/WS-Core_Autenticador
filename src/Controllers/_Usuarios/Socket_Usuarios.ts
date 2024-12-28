import { _UserLogin, _Usuarios } from "../../Models/DB/_Usuarios";
import { Modelo_Config } from "../../Models/Modelo_Configuracao";
import { Pacotes_Socket } from "../../Models/Modulos/Pacotes_Socket";
import { Conector_Mysql } from "../Lib/Conector_Mysql";
import { Config_Usuarios } from "./Config_Usuarios";
import { Logger } from "../Lib/Logger";
import { Socket_Client } from "../Modulos/Socket_Client";
import { Config_Permissoes } from "../_Permissoes/Config_Permissoes";



export class Socket_Usuarios {
    private _Logger: Logger; // Instância do Logger para capturar logs
    private _BD: Conector_Mysql; // Conexão com o banco de dados MySQL
    private _Config: Modelo_Config; // Instância de configuração do sistema
    private _Core_Conection: Socket_Client; // instancia de comunicação socket com o Core
    private _Config_Usuarios: Config_Usuarios; // instancia da classe de controle de usuarios
    private _Config_Permissoes: Config_Permissoes; // Instancia da classe de controle de Permissoes

    // Construtor inicializa o objeto com as configurações e a conexão ao banco de dados
    constructor(_config: Modelo_Config, _bd: Conector_Mysql, _core_conection: Socket_Client) {
        this._Config = _config; // Armazena a configuração passada
        this._BD = _bd; // Armazena a conexão com o banco de dados
        this._Core_Conection = _core_conection;
        this._Logger = new Logger(); // Cria uma nova instância de Logger
        this._Config_Usuarios = new Config_Usuarios(this._Config, this._BD); // instancia da classe de controle de usuarios
        this._Config_Permissoes = new Config_Permissoes(this._Config, this._BD);

    }

    Inicializar_Listeners() {
        // Adiciona os listeners de eventos do Socket
        this._Core_Conection.socketClient.on("usuarios/login", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            // Converte para estrutura de dados do usuário
            let userData: _UserLogin = Object.assign(new _UserLogin(), JSON.parse(dadosRetorno.dados));
            this._Config_Usuarios.Login(userData.Usuario, userData.Senha)
                .then((Dados_Usuario) => {
                    this._Config_Permissoes.Autorizar(Dados_Usuario.id, "usuarios/login").then(() => {
                        callback({
                            login: "OK",
                            token: Dados_Usuario.token,
                            Dados_Usuario: Dados_Usuario
                        })
                    }).catch((err) => {
                        callback({
                            login: "Erro",
                            mensagem: err.mensagem
                        })
                    })
                }).catch(err => {
                    callback({
                        login: "Erro",
                        mensagem: "Usuário ou senha Invalidos"
                    })
                })
        })
        // Listener de autenticação por token
        this._Core_Conection.socketClient.on("usuarios/logintoken", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            // Converte para estrutura de dados do usuário
            let userData: _UserLogin = Object.assign(new _UserLogin(), JSON.parse(dadosRetorno.dados));
            // Realiza a autenticação usando o Token
            this._Config_Usuarios.Login_Token(userData.token)
                .then((Dados_Usuario) => {
                    this._Config_Permissoes.Autorizar(Dados_Usuario.id, "usuarios/login").then(() => {
                        callback({
                            login: "OK",
                            token: Dados_Usuario.token,
                            Dados_Usuario: Dados_Usuario
                        })
                    }).catch((err) => {
                        callback({
                            login: "Erro",
                            mensagem: err.mensagem
                        })
                    })
                }).catch(err => {
                    callback({
                        login: "Erro",
                        mensagem: "Usuário ou senha Invalidos"
                    })
                })
        })

        // Lista os Usuários
        this._Core_Conection.socketClient.on("usuarios/listar", (dadosRetorno: Pacotes_Socket, callback = (...retorno_callback: any) => { }) => {
            this._Config_Usuarios.Login_Token(dadosRetorno.token)
                .then((Dados_Usuario) => {
                    this._Config_Permissoes.Autorizar(Dados_Usuario.id, "usuarios/login").then(() => {
                        callback({
                            login: "OK",
                            token: Dados_Usuario.token,
                            Dados_Usuario: Dados_Usuario
                        })
                    }).catch((err) => {
                        callback({
                            login: "Erro",
                            mensagem: err.mensagem
                        })
                    })
                }).catch(err => {
                    callback({
                        login: "Erro",
                        mensagem: "Usuário ou senha Invalidos"
                    })
                })
        })
    }

    /**
     * ==============================================================
     * REMOVER ESSA FUNÇÂO AO FINALIZAR OS TESTES
     * ==============================================================
     */
    Cria_Usuario_Teste() {
        let _UsuariosTeste: Config_Usuarios = new Config_Usuarios(this._Config, this._BD);
        let _Novo_Usuario: _Usuarios = new _Usuarios()


        _UsuariosTeste.Login("user123", "Seguro123").then((_Dados_Usuarios: _Usuarios) => {
            this._Logger.Log(_Dados_Usuarios);
        }).catch(err => {
            this._Logger.Error("no teste de usuario", err);
        });

        _Novo_Usuario.nome = "Nome de teste";
        _Novo_Usuario.nome_social = "Nome Social"
        _Novo_Usuario.email = "Email@dominio.com.br";
        _Novo_Usuario.usuario = "User123";
        _Novo_Usuario.senha = "Seguro123";
        _Novo_Usuario.is_api = false;
        _Novo_Usuario.ativo = true;

        _UsuariosTeste.NewUser(_Novo_Usuario).then((_Dados_Usuarios: _Usuarios) => {
            this._Logger.Log(_Dados_Usuarios);
        }).catch(err => {
            this._Logger.Error("no teste de novo usuario", err);
        });

        _UsuariosTeste.Login("User123", "Seguro123").then((_Dados_Usuarios: _Usuarios) => {
            this._Logger.Log(_Dados_Usuarios);
        }).catch(err => {
            this._Logger.Error("no teste de usuario", err);
        });
        this._Logger.Error("REMOVER FUNÇÃO DE TESTES")
    }
    /**
     * ==============================================================
     * REMOVER ESSA FUNÇÂO AO FINALIZAR OS TESTES
     * ==============================================================
     */
}