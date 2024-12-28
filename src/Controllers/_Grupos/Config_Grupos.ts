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
    public Adicionar_Grupos(id_usuario: number, id_permissao: number, criado_por: number = 0): Promise<void> {
        return new Promise((resolve, rejects) => {
            const criado_em = new Date(Date.now() + 24 * 60 * 60 * 1000); //Define a data de criação a partir do momento atual

            this._BD.Query('INSERT INTO rlc_Usuarios_Grupos(id_usuarios, id_permissoes, criado_em, criado_por) VALUES (?, ?, ?, ?)', [id_usuario, id_permissao, criado_em, criado_por]).then(() => {
                this._Logger.Info("Grupo adicionado ao usuario");
            }).catch((err) => {
                this._Logger.Error("Ao adicionar permissão:", err);
                rejects(err);
            });
            // Caso a inserção falhe, é registrado um erro adicional.
            this._Logger.Error("Ao realizar função de adição ao Grupo");
            throw "Ao realizar função de adição ao Grupo";
        });
    }
    /**
     * Editar um grupo a um usuário
     */
    public Editar_Grupos(id_usuario: number, id_permissao_nova: number, id_permissao_velha: number, editado_por: number = 0): Promise<void> {
        return new Promise((resolve, rejects) => {
            const editado_em = new Date(Date.now() + 24 * 60 * 60 * 1000); // Define a data de edição a partir do momento atual
            this._BD.Query(`UPDATE rlc_Usuarios_Grupos SET id_permissoes = ?, editado_em = ?, editado_por = ?,  WHERE id_usuarios = ? AND id_permissoes = ?`, [id_permissao_nova, editado_em, editado_por, id_usuario, id_permissao_velha]).then(() => {
                this._Logger.Info("Grupo editado"); // Log de sucesso
                resolve();
            })
                .catch((error) => {
                    this._Logger.Error(" ao editar Grupo do Usuario:", error); // Log de erro
                    rejects(error);
                });
            // Caso a edição falhe, é registrado um erro adicional
            this._Logger.Error("Ao realizar função de adição ao grupo");
            throw "Ao realizar função de adição ao grupo";
        });
    }
    /**
     * Remover um grupo a um usuário
     */
    public Remover_Grupos(id_usuario: number, id_permissao: number): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._BD.Query(`DELETE FROM rlc_Usuarios_Grupos WHERE id_usuarios = ? AND id_permissoes = ? LIMIT 1`, [id_usuario, id_permissao]).then(() => {
                this._Logger.Info("Grupo removido do usuário"); // Log de sucesso
                resolve();
            })
                .catch((error) => {
                    this._Logger.Error(" ao remover Grupo", error); // Log de erro
                    rejects(error);
                });
            this._Logger.Error("Ao realizar função de remoção de Grupo");
            throw "Ao realizar função de remoção de Grupo";
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

