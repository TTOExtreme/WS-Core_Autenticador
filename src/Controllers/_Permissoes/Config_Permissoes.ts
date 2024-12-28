import CryptoJS from 'crypto-js';
import { Modelo_Config } from '../../Models/Modelo_Configuracao';
import { Conector_Mysql } from '../Lib/Conector_Mysql';
import { _Permissoes } from '../../Models/DB/_Permissoes';
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
* Adicionar uma permissão a um usuário
* @param id_usuario - ID do usuário
* @param id_permissao - ID da permissão a ser adicionada
* @param criado_por - ID de quem está criando (opcional)
*/
    public Adicionar_Permissoes(id_usuario: number, id_permissao: number, criado_por: number = 0): Promise<void> {
        return new Promise((resolve, rejects) => {
            const criado_em = new Date(Date.now() + 24 * 60 * 60 * 1000); // Define a data de criação a partir do momento atual
            this._BD.Query('INSERT INTO rlc_permissoes_usuario (id_usuarios, id_permissoes, criado_em, criado_por) VALUES (?, ?, ?, ?)', [id_usuario, id_permissao, criado_em, criado_por]
            ).then(() => {
                this._Logger.Info("Permissão adicionada"); // Log de sucesso
                resolve();
            }).catch((err) => {
                this._Logger.Error("ao adicionar permissão:", err); // Log de erro
                rejects(err);
            });
            // Caso a inserção falhe, é registrado um erro adicional
            this._Logger.Error("Ao realizar função de adição de permissão");
            rejects("Ao realizar função de adição de permissão");
        });
    }

    /**
     * Editar uma permissão de um usuário
     * @param id_usuario - ID do usuário
     * @param id_permissoes - ID da permissão atual
     * @param permissao_velha - ID da permissão antiga
     * @param permissao_nova - ID da nova permissão
     * @param editado_por - ID de quem está editando (opcional)
     */
    public Editar_Permissoes(id_usuario: number, id_permissao_velha: number, id_permissao_nova: number, editado_por: number = 0): Promise<void> {
        return new Promise((resolve, rejects) => {
            const editado_em = new Date(Date.now() + 24 * 60 * 60 * 1000); // Define a data de edição a partir do momento atual
            this._BD.Query(`UPDATE rlc_permissoes_usuario SET id_permissoes = ?, editado_em = ?, editado_por = ?,  WHERE id_usuarios = ? AND id_permissoes = ?`, [id_permissao_nova, editado_em, editado_por, id_usuario, id_permissao_velha])
                .then(() => {
                    this._Logger.Info("Permissão editada"); // Log de sucesso
                    resolve();
                })
                .catch((error) => {
                    this._Logger.Error(" ao editar permissão:", error); // Log de erro
                    rejects(error);
                });
            // Caso a edição falhe, é registrado um erro adicional
            this._Logger.Error("Ao realizar função de edição de permissão");
            rejects("Ao realizar função de edição de permissão");
        });
    }
    /**
     * Remover uma permissão de um usuário
     * @param id_usuario - ID do usuário
     * @param id_permissoes - ID da permissão a ser removida
     */
    public Remover_Permissoes(id_usuario: number, id_permissoes: number): Promise<void> {
        return new Promise((resolve, rejects) => {
            this._BD.Query(`DELETE FROM rlc_permissoes_usuario WHERE id_usuarios = ? AND id_permissoes = ?`, [id_usuario, id_permissoes])
                .then(() => {
                    this._Logger.Info("Permissão removida do usuário"); // Log de sucesso
                    resolve();
                })
                .catch((error) => {
                    this._Logger.Error(" ao remover permissão", error); // Log de erro
                    rejects(error);
                });
            // Caso a remoção falhe, é registrado um erro adicional
            this._Logger.Error("Ao realizar função de remoção de permissão");
            rejects("Ao realizar função de remoção de permissão");
        });
    }

    /**
     * Listar as permissoes de um usuário
     * @param Id_Usuario 
     */
    public Listar_Permissoes(Id_Usuario: number): Promise<string[]> {
        return new Promise((resolve, rejects) => {
            this._BD.Query("SELECT u.usuario, p.nome AS Permissao FROM _Usuarios u LEFT JOIN rlc_Permissoes_Usuarios rpu ON u.id = rpu.id_usuarios LEFT JOIN _Permissoes p ON p.id = rpu.id_permissoes WHERE u.id = ? GROUP BY u.usuario, p.nome ORDER BY u.usuario, p.nome;", [Id_Usuario])
                .then((result: any) => {
                    // Verificar se o resultado é um array (para SELECT)
                    if (Array.isArray(result)) {
                        const permissoes = result.map((row: any) => row.Permissao);
                        this._Logger.Info(`Permissões do usuário listadas.`);
                        resolve(permissoes);
                    } else {
                        // Caso seja outro tipo de retorno (OkPacket, por exemplo)
                        this._Logger.Error("Tipo inesperado de resultado ao listar permissões.");
                        rejects("Tipo inesperado de resultado ao listar permissões.");
                    }
                })
                .catch((error) => {
                    this._Logger.Error(" ao listar permissões:", error);
                    rejects(error);
                });
        });
    }


    /**
     * Listar todas as permissoes existentes no banco sem filtro de usuario
     * @returns 
     */
    public Listar_Todos_Permissoes(): Promise<_Permissoes[]> {
        return new Promise((resolve, reject) => {
            this._BD.Query("SELECT * FROM _Permissoes", [])
                .then((result) => {
                    let results_json = Object.assign([], result); // Converte o resultado da query em um array de objetos
                    if (results_json.length > 0) { // Se houver Permissao no banco
                        let listaPermissao = results_json.map((permissao: any) => {
                            let _Dados_Permissoes = Object.assign(new _Permissoes(), permissao); // Mapeia os dados do banco para o modelo de usuário
                            return _Dados_Permissoes; // Retorna os dados das permissoes
                        });
                        resolve(listaPermissao); // Retorna a lista de permissoes
                    } else {
                        resolve([]); // Se não houver usuários, retorna uma lista vazia
                    }
                })
                .catch((error) => {
                    this._Logger.Error(" ao listar todas as permissões:", error);
                    reject(error);
                });
        });
    }


    /**
      * Autorizar uma permissão específica para um usuário (não implementado)
      * @param Id_Usuario - ID do usuário
      * @param Permissao - Nome da permissão
      * @returns Promise<void>
      */
    public Autorizar(Id_Usuario: number, Permissao: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this._Logger.Error("Realizando uma Call Não implementada, Autorizando inicialmente:", "Call: Autorizar() Classe: _Config_Permissoes");

            resolve();
            // Lógica ainda não implementada
            return;

            // Exemplo de rejeição para usuário sem permissão
            reject({
                mensagem: "Usuário sem permissão para a ação",
                dadosAdicionais: "Permissão: " + Permissao
            });
        });
    }

}


