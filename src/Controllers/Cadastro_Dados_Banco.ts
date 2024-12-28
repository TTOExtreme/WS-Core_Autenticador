import { Modelo_Config } from "../Models/Modelo_Configuracao";
import { Conector_Mysql } from "./Lib/Conector_Mysql";
import { Logger } from "./Lib/Logger";
import *  as fs from 'fs';



export class Cadastro_Dados_Banco {
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
     * Inicia a geração das tabelas no banco
     */
    Inicializar_Tabelas() {
        return new Promise<void>((Inicializar_resolv, Inicializar_reject) => {
            this._Logger.System('[Install] Iniciando listagem de Tabelas a serem criadas no Banco');

            let main_tables: Array<string> = [];
            let rlc_tables: Array<string> = [];
            let alter_tables: Array<string> = [];
            let data_tables: Array<string> = [];

            fs.readdirSync(__dirname + '/../SQL').forEach(filepath => {
                // caso seja uma tabela primaria
                if (filepath.indexOf('_') == 0) { main_tables.push(__dirname + '/../SQL/' + filepath); }
                // caso seja uma tabela relacional
                if (filepath.indexOf('rlc_') == 0) { rlc_tables.push(__dirname + '/../SQL/' + filepath); }
                // caso seja uma alteracao de estrutura de tabelas
                if (filepath.indexOf('alter_') == 0) { alter_tables.push(__dirname + '/../SQL/' + filepath); }
                // caso seja os dados a serem imbutidos na tabela
                if (filepath.indexOf('data_') == 0) { data_tables.push(__dirname + '/../SQL/' + filepath); }
            })

            // Cria todos os promisses de execução das tabelas primarias
            let m_table_proms: Array<Promise<void>> = [];
            main_tables.forEach(item => {
                let fileScripts = fs.readFileSync(item).toString().split(';');
                fileScripts.forEach(script_sql => {
                    if (script_sql != "") {
                        m_table_proms.push(new Promise((resolv, reject) => {
                            this._BD.Query(script_sql, []).then(() => {
                                this._Logger.System("[Install] Criado Tabela Primaria:", item.substring(item.lastIndexOf("/") + 1, item.lastIndexOf('.')));
                                resolv();
                            }).catch((err) => {
                                this._Logger.Error("Ao executar SQL: ", item, err);
                                reject();
                            })
                        }))
                    }
                })
            })
            // Cria todos os promisses de execução das tabelas Relacionais
            let r_table_proms: Array<Promise<void>> = [];
            rlc_tables.forEach(item => {
                let fileScripts = fs.readFileSync(item).toString().split(';');
                fileScripts.forEach(script_sql => {
                    if (script_sql != "") {
                        r_table_proms.push(new Promise((resolv, reject) => {
                            this._BD.Query(script_sql, []).then(() => {
                                this._Logger.System("[Install] Criado Tabela Relacional:", item.substring(item.lastIndexOf("/") + 1, item.lastIndexOf('.')));
                                resolv();
                            }).catch((err) => {
                                this._Logger.Error("Ao executar SQL: ", item, err);
                                reject();
                            })
                        }))
                    }
                })
            })
            // Cria todos os promisses de execução das alteracoes de tabelas
            let a_table_proms: Array<Promise<void>> = [];
            alter_tables.forEach(item => {
                let fileScripts = fs.readFileSync(item).toString().split(';');
                fileScripts.forEach(script_sql => {
                    if (script_sql != "") {
                        a_table_proms.push(new Promise((resolv, reject) => {
                            this._BD.Query(script_sql, []).then(() => {
                                this._Logger.System("[Install] Alterado Tabela:", item.substring(item.lastIndexOf("/") + 1, item.lastIndexOf('.')));
                                resolv();
                            }).catch((err) => {
                                this._Logger.Error("Ao executar SQL: ", item, err);
                                reject();
                            })
                        }))
                    }
                })
            })
            // Cria todos os promisses de execução dos dados de tabelas
            let d_table_proms: Array<Promise<void>> = [];
            data_tables.forEach(item => {
                let fileScripts = fs.readFileSync(item).toString().split(';');
                fileScripts.forEach(script_sql => {
                    if (script_sql != "") {
                        m_table_proms.push(new Promise((resolv, reject) => {
                            this._BD.Query(script_sql, []).then(() => {
                                this._Logger.System("[Install] Inserido dados na Tabela:", item.substring(item.lastIndexOf("/") + 1, item.lastIndexOf('.')));
                                resolv();
                            }).catch((err) => {
                                this._Logger.Error("Ao executar SQL: ", item, err);
                                reject();
                            })
                        }))
                    }
                })
            })


            // Realiza a operação de todas as tabelas e SQLs existentes
            Promise.all(m_table_proms).finally(() => {
                Promise.all(r_table_proms).finally(() => {
                    Promise.all(a_table_proms).finally(() => {
                        Promise.all(d_table_proms).finally(() => {
                            this._Logger.System("[Install] Finalizado Preparo do Banco de dados")
                            Inicializar_resolv();
                        }).catch(err => {
                            this._Logger.Error(err)
                            Inicializar_reject();
                        })
                    }).catch(err => {
                        this._Logger.Error(err)
                        Inicializar_reject();
                    })
                }).catch(err => {
                    this._Logger.Error(err)
                    Inicializar_reject();
                })
            }).catch(err => {
                this._Logger.Error(err)
                Inicializar_reject();
            })
        })
    }
    /**
     * Inicia a inserção de dados pré definidos no banco atual
     */
    Inicializar_Dados() {

    }
}