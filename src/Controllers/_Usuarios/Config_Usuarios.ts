import CryptoJS from 'crypto-js';
import { Modelo_Config } from '../../Models/Modelo_Configuracao';
import { Conector_Mysql } from '../Lib/Conector_Mysql';
import { Logger } from '../Lib/Logger';
import { _Usuarios } from '../../Models/DB/_Usuarios';

export class Config_Usuarios {
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
     * Função para criar um novo usuário no sistema e gerar token de autenticação
     * @param _Dados_Usuarios Dados dos usuarios a ser inseridos
     * @param criado_por Marcação de usuario para criação
     * @returns 
     */
    public NewUser(_Dados_Usuarios: _Usuarios, criado_por: number = 0): Promise<_Usuarios> {
        return new Promise((resolve, rejects) => {
            _Dados_Usuarios.criado_por = criado_por; // Define o criador do usuário
            _Dados_Usuarios.criado_em = new Date(Date.now() + 24 * 60 * 60 * 1000); // Define a data de criação com validade de 24 horas
            _Dados_Usuarios.senha = this.CriptoSenha(_Dados_Usuarios.senha); // Criptografa a senha do usuário
            // Insere o novo usuário no banco de dados
            this._BD.Query('INSERT INTO _Usuarios(nome, nome_social,usuario,senha,email,is_api,criado_em,criado_por,ativo) VALUES(?,?,?,?,?,?,?,?,?)',
                [_Dados_Usuarios.nome, _Dados_Usuarios.nome_social, _Dados_Usuarios.usuario, _Dados_Usuarios.senha, _Dados_Usuarios.email, _Dados_Usuarios.is_api, _Dados_Usuarios.criado_em, _Dados_Usuarios.criado_por, _Dados_Usuarios.ativo])
                .then(() => { // Se a inserção for bem-sucedida
                    this.GerarToken(_Dados_Usuarios).then((_Dados_Usuarios_novo) => { // Gera um token de autenticação
                        resolve(_Dados_Usuarios_novo); // Retorna o usuário com o token gerado
                    }).catch((err) => {
                        this._Logger.Error("Ao gerar novo token do Usuario", err); // Loga erro ao gerar token
                    });
                }).catch((err) => {
                    this._Logger.Error("ao Criar usuario", err); // Loga erro ao criar usuário
                    rejects("ao Criar Usuario"); // Rejeita a promessa com mensagem de erro
                });
        });
    }

    /**
     * Função para efetuar e validar o Login e senha e 
     * ja fazer a geração de novo token e atualizar campo de data_login
     * @param usuario Usuario para login
     * @param senha Senha para o Login
     */
    public Login(usuario: string, senha: string): Promise<_Usuarios> {
        return new Promise((resolve, rejects) => {
            // Consulta o banco de dados para verificar o usuário e a senha criptografada
            this._BD.Query('SELECT * FROM _Usuarios  WHERE usuario = ? AND senha = ? LIMIT 1;',
                [usuario, this.CriptoSenha(senha)])
                .then((resultado) => {
                    let results_json = Object.assign([], resultado); // Converte o resultado da query em um array de objetos
                    if (results_json.length > 0) { // Se o usuário for encontrado
                        let _Dados_Usuarios = Object.assign(new _Usuarios(), results_json[0]); // Mapeia os dados do banco para o modelo de usuário
                        _Dados_Usuarios.senha = ""; // Limpa o campo senha para segurança
                        _Dados_Usuarios.data_login = new Date(Date.now() + 24 * 60 * 60 * 1000); // Define a data do login com validade de 24 horas
                        // Gera um novo token de autenticação
                        this.GerarToken(_Dados_Usuarios).then((_Dados_Usuarios_novo) => {
                            resolve(_Dados_Usuarios_novo); // Retorna o usuário com novo token
                        }).catch((err) => {
                            this._Logger.Error("Ao gerar novo token do Usuario", err); // Loga erro ao gerar token
                        });
                    } else {
                        rejects("Usuario ou senha invalidos"); // Se o usuário ou a senha forem inválidos
                    }
                }).catch((err) => {
                    this._Logger.Error("ao consultar usuario no banco", err); // Loga erro ao consultar o banco
                    rejects("ao consultar usuario no banco"); // Rejeita a promessa com erro
                });
        });
    }

    /**
     * Função para efetuar e validar o Login e senha e 
     * ja fazer a geração de novo token e atualizar campo de data_login
     * @param usuario Usuario para login
     * @param senha Senha para o Login
     */
    public Login_Token(token: string): Promise<_Usuarios> {
        return new Promise((resolve, rejects) => {
            // Atualiza o token e a validade no banco de dados

            this._BD.Query('SELECT * FROM _Usuarios WHERE token = ? LIMIT 1;', [token])
                .then((resultado) => {
                    let _Dados_Usuarios: Array<_Usuarios> = Object.assign(new Array<_Usuarios>(), resultado);
                    if (_Dados_Usuarios.length > 0) {
                        _Dados_Usuarios[0].senha = "";
                        _Dados_Usuarios[0].data_login = new Date(Date.now() + 24 * 60 * 60 * 1000);
                        this.revalidationToken(_Dados_Usuarios[0]).then((_Dados_Usuarios_novo) => {
                            resolve(_Dados_Usuarios_novo)
                        }).catch((err) => {
                            this._Logger.Error("Ao gerar novo token do Usuario", err)
                        })
                    } else {
                        rejects("Usuario ou senha invalidos")
                    }
                }).catch((err) => {
                    this._Logger.Error("ao consultar usuario no banco", err)
                    rejects("ao consultar usuario no banco")
                })
        })
    }

    // Função para listar todos os usuários no sistema
    public ListarUsuarios(): Promise<_Usuarios[]> {
        return new Promise((resolve, rejects) => {
            // Executa a query no banco de dados para selecionar todos os usuários
            this._BD.Query('SELECT * FROM _Usuarios', [])
                .then((resultado) => {
                    let results_json = Object.assign([], resultado); // Converte o resultado da query em um array de objetos
                    if (results_json.length > 0) { // Se houver usuários no banco
                        let listaUsuarios = results_json.map((usuario: any) => {
                            let _Dados_Usuarios = Object.assign(new _Usuarios(), usuario); // Mapeia os dados do banco para o modelo de usuário
                            _Dados_Usuarios.senha = ""; // Remove a senha dos dados retornados por segurança
                            return _Dados_Usuarios; // Retorna o usuário sem a senha
                        });
                        resolve(listaUsuarios); // Retorna a lista de usuários
                    } else {
                        resolve([]); // Se não houver usuários, retorna uma lista vazia
                    }
                }).catch((err) => {
                    this._Logger.Error("ao listar usuarios no banco", err); // Loga erro ao listar usuários no banco
                    rejects("ao listar usuarios no banco"); // Rejeita a promessa com mensagem de erro
                });
        });
    }

    /**
     * Função para alterar a senha do usuário.
     * Criptografa a nova senha, atualiza no banco de dados e gera um novo token.
     */
    // public AlteracaoSenha(novaSenha: string): any {
    //     const senhaCriptografada = this.CriptoSenha(novaSenha); // Criptografa a nova senha
    //     _BD.Query('UPDATE __Usuarios SET senha = ? WHERE id = ?', [senhaCriptografada, this.id]); // Atualiza no banco
    //     this.senha = senhaCriptografada; // Atualiza a senha na instância
    //     this.ResetToken(); // Reseta o token atual
    //     this.GerarToken(); // Gera um novo token
    //     console.log("Senha alterada com sucesso e atualizada no banco de dados");
    // }

    /**
     * Função para alterar o nome do usuário no banco de dados.
     * Atualiza o nome tanto no banco quanto na instância local.
     */
    // public AlteracaoNome(NovoNome: string): any {
    //     this._BD.Query('UPDATE _Usuarios SET name = ? WHERE id = ?', [NovoNome, this.id]); // Atualiza o nome no banco
    //     this.nome = NovoNome; // Atualiza o nome na instância
    //     console.log('Nome alterado com sucesso e atualizado no banco de dados.');
    // }

    /**
     * Função para gerar um token de autenticação. caso a mesma não seja usada por API
     * Usa o nome, senha e timestamp como 'seed' para gerar um hash.
     * O token é salvo no banco de dados e tem validade de 24 horas.
     * @param _Dados_Usuarios Dados completos do usuario que consistem no banco
     * @param is_api 
     * @returns 
     */
    public GerarToken(_Dados_Usuarios: _Usuarios, is_api: boolean = false): Promise<_Usuarios> {
        return new Promise((resolve, rejects) => {
            if (!is_api) { // Apenas gera token se o usuário não for de API
                const seed = `${_Dados_Usuarios.usuario}-${_Dados_Usuarios.senha}-${Date.now()}`; // Cria um seed baseado no nome, senha e timestamp
                _Dados_Usuarios.token = CryptoJS.SHA3(seed, { outputLength: 512 }).toString(); // Gera o token usando SHA3
                _Dados_Usuarios.data_token = new Date(Date.now() + 24 * 60 * 60 * 1000); // Define a data de expiração do token para 24 horas
                // Atualiza o token no banco de dados
                this._BD.Query('UPDATE _Usuarios SET token = ?, data_token = ? WHERE id = ?',
                    [_Dados_Usuarios.token, _Dados_Usuarios.data_token.toISOString().slice(0, 19).replace('T', ' '), _Dados_Usuarios.id])
                    .then(() => {
                        resolve(_Dados_Usuarios); // Retorna o usuário com o token atualizado
                    }).catch((err) => {
                        this._Logger.Error("Ao inserir novo token no Banco", err); // Loga erro ao atualizar token no banco
                    });
            }
        });
    }

    /**
     * Função para validar o token de autenticação.
     * Verifica se o token fornecido é válido e se ainda não expirou.
     * Se o token for inválido ou expirado, reseta o token no banco.
     * @param token do usuario
     */
    public revalidationToken(_Dados_Usuarios: _Usuarios): Promise<_Usuarios> {
        return new Promise((resolve, rejects) => {
            if (!_Dados_Usuarios.token || !_Dados_Usuarios.data_token) { // Verifica se o token existe
                rejects("Token Invalido")
            }
            const isTokenValid = new Date() < _Dados_Usuarios.data_token; // Valida a data de expiração do token
            if (!isTokenValid) { // Se o token estiver expirado
                // Gera um novo token
                this.GerarToken(_Dados_Usuarios).then((_Dados_Usuarios_novo: _Usuarios) => {
                    resolve(_Dados_Usuarios_novo); // Retorna o usuário com o novo token
                }).catch((err: any) => {
                    this._Logger.Error("Ao Revalidar token no Banco", err); // Loga erro ao revalidar token
                });
            } else {
                resolve(_Dados_Usuarios); // Se o token ainda for válido, apenas retorna o usuário
            }
        });
    }

    /**
     * Função privada para criptografar a senha usando o algoritmo SHA3.
     * Utilizada ao armazenar ou alterar senhas.
     * @param senha 
     * @returns 
     */
    private CriptoSenha(senha: string): string {
        return CryptoJS.SHA3(senha, { outputLength: 512 }).toString(); // Retorna a senha criptografada
    }

    /**ARRUMAR
 * Função para alterar a senha do usuário.
 * Criptografa a nova senha, atualiza no banco de dados e gera um novo token.
 */
    // public AlteracaoSenha(novaSenha: string, _): any {
    //     const senhaCriptografada = this.CriptoSenha(novaSenha); // Criptografa a nova senha
    //     this._BD.Query('UPDATE __Usuarios SET senha = ? WHERE id = ?', [senhaCriptografada, this.id]); // Atualiza no banco
    //     this.senha = senhaCriptografada; // Atualiza a senha na instância
    //     this.ResetToken(); // Reseta o token atual
    //     this.GerarToken(); // Gera um novo token
    //     console.log("Senha alterada com sucesso e atualizada no banco de dados");
    // }

    /**ARRUMAR
     * Função para alterar o nome do usuário no banco de dados.
     * Atualiza o nome tanto no banco quanto na instância local.
     */
    // public AlteracaoNome(NovoNome: string): any {
    //     this._BD.Query('UPDATE _Usuarios SET name = ? WHERE id = ?', [NovoNome, this.id]); // Atualiza o nome no banco
    //     this.nome = NovoNome; // Atualiza o nome na instância
    //     console.log('Nome alterado com sucesso e atualizado no banco de dados.');
    // }
}


