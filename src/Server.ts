import * as fs from 'fs';
import { Logger } from './Controllers/Lib/Logger';
import { Modelo_Config } from './Models/Modelo_Configuracao';
import Modelo_Config_JSON from './Models/Modelo_Config_JSON.json';
import { Conector_Mysql } from './Controllers/Lib/Conector_Mysql';
import { _Modulos_Configuracao } from './Models/DB/_Modulos_Configuracao';
import { uint16 } from './@Types/Tipo_Inteiros';
import { Socket_Client } from './Controllers/Modulos/Socket_Client';
import { Modulos_Struct } from './Models/Modulos/Modulos_Struct';
import { Pacotes_Socket } from './Models/Modulos/Pacotes_Socket';
import { _UserLogin, _Usuarios } from './Models/DB/_Usuarios';
import { Socket_Usuarios } from './Controllers/_Usuarios/Socket_Usuarios';
import { Socket_Grupos } from './Controllers/_Grupos/Socket_Grupos';
import { Socket_Permissoes } from './Controllers/_Permissoes/Socket_Permissoes';



/**
 * Variaveis Gerais
 */
const _Logger: Logger = new Logger();
let _Config: Modelo_Config;
let _BD: Conector_Mysql;
let _Core_Conection: Socket_Client;


/**
 * Inicializa todo o arquivo de configuração
 */
function InicializarConfiguração() {
    /**
     * Checa se existe o arquivo de configuração na pasta raiz, 
     * caso nao exista a pasta e/ou o arquivo o mesmo cria automaticamente e
     * entra em estado halt;
     */
    if (!fs.existsSync(__dirname + '/config/')) {
        try {
            fs.mkdirSync(__dirname + '/config/');
        } catch (err) {
            _Logger.Error("ao tentar criar a pasta de configuração em:", __dirname + '/config/');
            _Logger.Error(err);
            process.abort();
        }
    }
    if (!fs.existsSync(__dirname + '/config/config.cfg')) {
        try {
            _Logger.Info("Criado novo arquivo de configuração em:", __dirname + '/config/config.cfg');
            fs.writeFileSync(__dirname + '/config/config.cfg', JSON.stringify(Modelo_Config_JSON, null, 4));
            process.exit(1);
        } catch (err) {
            _Logger.Error("ao tentar criar a pasta de configuração em:", __dirname + '/config/');
            _Logger.Error(err);
            process.exit(1);
        }
    }


    /**
     * Carrega o arquivo de configuração
     */
    _Config = JSON.parse(fs.readFileSync(__dirname + '/config/config.cfg').toString());
}


/**
 * Inicializa a conexão com o Banco de dados
 */
function InicializarBanco() {
    return new Promise<void>((resolv, reject) => {
        // Inicia a instancia de conexão com o Banco de dados
        _BD = new Conector_Mysql(_Config.BD.Usuario, _Config.BD.Senha, _Config.BD.Database, _Config.BD.Host, _Config.BD.Porta);

        // Conecta no banco
        _BD.Conectar().then(() => {
            resolv();

            // _Logger.System("Listando versões dos módulos do sistema ativos", _Config.BD.Porta);

            // _BD.Query("SELECT * FROM _Modulos_Configuracao WHERE ativo = 1;", []).then((results) => {
            //     let results_json = Object.assign([], results)
            //     for (let i = 0; i < results_json.length; i++) {
            //         const md: _Modulos_Configuracao = results_json[i];
            //         _Logger.Info("Módulo:", md.nome, md.versao);
            //     }
            // }).catch(err => {
            //     _Logger.Error("Ao consultar versões do sistema", err);
            // })
        }).catch(err => {
            _Logger.Error(err);
        })
    })
}


/**
 * Inicializa a comunicação Socket entre servidor e cliente, simulando ambos os lados
 */
function InicializarSocketServer() {
    return new Promise<void>((resolv, reject) => {

        //Dados de descrição do Primeiro Módulo
        let ModData: Modulos_Struct = new Modulos_Struct();
        ModData.Modulo_Nome = "WSCore_Autenticador";
        ModData.Modulo_Descricao = "Módulo de Autenticação";
        ModData.Modulo_Versao = "0.0.1";




        // Inicia a conexao com o servidor de Socket
        _Core_Conection = new Socket_Client(new uint16(7000), '127.0.0.1', ModData);

        _Logger.System(_Core_Conection.Modulo_Dados.Modulo_Nome + " Iniciando Comunicação com o Core");
        // Realiza a conexão com o Servidor
        _Core_Conection.Connect().then(() => {
            _Logger.System(_Core_Conection.Modulo_Dados.Modulo_Nome + " Conectado ao Core");
            resolv();
        }).catch((err) => {
            _Logger.Error("Ao inicializar cliente socket pela instancia do módulo", err);
        })

    });
}




InicializarConfiguração();
InicializarBanco().then(() => {
    InicializarSocketServer().then(() => {


        // Inicializa os Listeners do Socket para controle do usuário
        let _Socket_Usuarios = new Socket_Usuarios(_Config, _BD, _Core_Conection);
        _Socket_Usuarios.Inicializar_Listeners();

        // Inicializa os Listeners do Socket para controle de grupos
        let _Socket_Grupos = new Socket_Grupos(_Config, _BD, _Core_Conection);
        _Socket_Grupos.Inicializar_Listeners();

        // Inicializa os Listeners do Socket para controle de permissoes
        let _Socket_Permissoes = new Socket_Permissoes(_Config, _BD, _Core_Conection);
        _Socket_Permissoes.Inicializar_Listeners();


    }).catch(err => {
        _Logger.Error("Ao Iniciar o Core", err);
    });
}).catch(err => {
    _Logger.Error("Ao conectar no banco de dados", err);
});