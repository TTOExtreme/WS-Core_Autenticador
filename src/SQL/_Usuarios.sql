CREATE TABLE IF NOT EXISTS _Usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) COMMENT "Nome do colaborador",
    nome_social VARCHAR(255) COMMENT "Nome do colaborador a ser exibido",
    usuario VARCHAR(255) COMMENT "Nome de usuario para login",
    senha VARCHAR(255) COMMENT "Senha de usuario para login",
    email VARCHAR(255) COMMENT "Email do do colaborador",
    preferencias MEDIUMTEXT COMMENT "Preferencias do usuario",
    data_login TIMESTAMP COMMENT "Data do ultimo login feito pelo usuario",
    data_logout TIMESTAMP COMMENT "Data do ultimo logout feito pelo usuario",
    token VARCHAR(255) COMMENT "Token para integração com a API",
    data_token TIMESTAMP COMMENT "Data da geração do ultimo token",
    is_api INT(1) DEFAULT 0 COMMENT "Estado do uso da API 0 = inativo, 1 = ativo",

        -- Bloco Padrão de todas as tabelas
    -- TODO: ADICIONAR FOREGN KEY EM TODOS OS COM USUÁRIOS
    criado_em TIMESTAMP COMMENT "Data da criação do registro",
    criado_por BIGINT NOT NULL COMMENT "Usuário que gerou o registro 0 = System",
    editado_em TIMESTAMP COMMENT "Data da edição do registro",
    editado_por BIGINT COMMENT "Usuário que editou o registro 0 = System",
    excluido_em TIMESTAMP COMMENT "Data da exclusão do registro",
    excluido_por BIGINT COMMENT "Usuário que excluiu o registro 0 = System",
    ativado_em TIMESTAMP COMMENT "Data da ativação do registro",
    ativado_por BIGINT COMMENT "Usuário que ativou o registro 0 = System",
    inativado_em TIMESTAMP COMMENT "Data da inativação do registro",
    inativado_por BIGINT COMMENT "Usuário que inativou o registro 0 = System",
    ativo INT(1) DEFAULT 0 COMMENT "Estado do registro 0 = inativo, 1 = ativo",
    excluido INT(1) DEFAULT 0 COMMENT "Estado da exclusão do registro 0 = não excluido, 1 = excluido"
);