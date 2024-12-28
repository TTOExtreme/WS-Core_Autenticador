CREATE TABLE IF NOT EXISTS _Permissoes(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(255) COMMENT "Código referenciando qual o caminho da permissão",
    nome VARCHAR(255) COMMENT "Nome da permissão",
    descricao VARCHAR(255) COMMENT "Descrição das permissões",
    modulo VARCHAR(255) COMMENT "Nome do modulo que vai a permissão"
);