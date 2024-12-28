import * as fs from 'fs';
import { Logger } from './Controllers/Lib/Logger';
import { Modelo_Config } from './Models/Modelo_Configuracao';
import Modelo_Config_JSON from './Models/Modelo_Config_JSON.json';
import { Conector_Mysql } from './Controllers/Lib/Conector_Mysql';
import { _Modulos_Configuracao } from './Models/DB/_Modulos_Configuracao';
import { _UserLogin, _Usuarios } from './Models/DB/_Usuarios';
import { Cadastro_Dados_Banco } from './Controllers/Cadastro_Dados_Banco';


/**
 * Variaveis Gerais
 */
const _Logger: Logger = new Logger();
let _Config: Modelo_Config;
let _BD: Conector_Mysql;


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
        }).catch(err => {
            _Logger.Error(err);
        })
    })
}




InicializarConfiguração();
InicializarBanco().then(() => {
    let CadastroBanco = new Cadastro_Dados_Banco(_Config, _BD);

    CadastroBanco.Inicializar_Tabelas().then(() => {
        _Logger.System("===== FINALIZADO INSTALAÇÃO =====");
        process.exit();
    }).catch(err => {
        _Logger.Error("Ao conectar no banco de dados", err);
        process.exit();
    });

}).catch(err => {
    _Logger.Error("Ao conectar no banco de dados", err);
    process.exit();
});
