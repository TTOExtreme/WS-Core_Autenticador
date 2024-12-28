CREATE TABLE IF NOT EXISTS _Menus(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(255) COMMENT "Código do Menu, unico para cada versão",
    nome VARCHAR(255) COMMENT "Nome do Menu visível",
    descricao VARCHAR(255) COMMENT "Descrição do Menu",
    menu_pai VARCHAR(255) COMMENT "Código do Menu pai",
    versao VARCHAR(255) COMMENT "Versão do Menu",
    permissao VARCHAR(255) COMMENT "Permissão necessaria para acesso ao menu",
    modulo VARCHAR(255) COMMENT "Módulo referente ao Menu",
    evento VARCHAR(255) COMMENT "Evento emitido pelo WebSocket ao acessar o item",
    load_dependencia VARCHAR(255) COMMENT "Localização do arquivo Javascript a ser carregado antes da emissão do evento",
    configuracao MEDIUMTEXT COMMENT "Dados adicionais de configuração do Menu a ser enviado via evento e ao realizar o carregamento da dependencia",
    -- Bloco Padrão de todas as tabelas
    -- TODO: ADICIONAR FOREGN KEY EM TODOS OS COM USUÁRIOS
    ativo INT(1) DEFAULT 1 COMMENT "Estado do registro 0 = inativo, 1 = ativo",
    excluido INT(1) DEFAULT 0 COMMENT "Estado da exclusão do registro 0 = não excluido, 1 = excluido"
);