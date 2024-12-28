
/* Cadastro de permissões de sistema */
INSERT INTO _Permissoes (codigo,nome,descricao,modulo) VALUES
("[system]/adm","Permissão System Global","Permissão de liberação completa de todo o sistema, independente de quaisquer outras permissões ou negações atribuidas","System");

/* Cadastro de permissões de controle de usuarios */ 
INSERT INTO _Permissoes (codigo,nome,descricao,modulo) VALUES
("usuarios/login","Login","Permissão de Login do Usuário ao sistema Web","WSCore_Autenticador"),
("usuarios/loginapi","Login API","Permissão de Login do Usuário a API","WSCore_Autenticador"),
("usuarios/resetsenha","Reset senha pessoal","Permissão de reset de senha pessoal","WSCore_Autenticador"),
("usuarios/resetsenhaglobal","Reset senha global","Permissão de reset de senha de outros usuários","WSCore_Autenticador"),
("usuarios/lista","Listagem Usuários","Permissão de Listagem de Usuários","WSCore_Autenticador"),
("usuarios/adicionar","Inclusão Usuários","Permissão de inclusão de Usuários","WSCore_Autenticador"),
("usuarios/editar","Edição Usuários","Permissão de edição dos Usuários","WSCore_Autenticador"),
("usuarios/excluir","Exclusão Usuários","Permissão de exclusão de Usuários","WSCore_Autenticador"),
("usuarios/inativar","Inativação Usuários","Permissão de inativação de Usuários","WSCore_Autenticador");

/* Cadastro de permissões de controle de grupos */ 
INSERT INTO _Permissoes (codigo,nome,descricao,modulo) VALUES
("grupos/lista","Listagem Grupos","Permissão de Listagem de Grupos","WSCore_Autenticador"),
("grupos/adicionar","Inclusão Grupos","Permissão de inclusão de Grupos","WSCore_Autenticador"),
("grupos/adicionar/usuario","Inclusão Grupos Usuários","Permissão de inclusão de Grupos a um Usuário","WSCore_Autenticador"),
("grupos/editar","Edição Grupos","Permissão de edição dos Grupos","WSCore_Autenticador"),
("grupos/editar/usuarios","Edição Grupos Usuários","Permissão de edição dos Grupos de um Usuário","WSCore_Autenticador"),
("grupos/excluir","Exclusão Grupos","Permissão de exclusão de Grupos","WSCore_Autenticador"),
("grupos/excluir/usuario","Exclusão Grupos Usuários","Permissão de exclusão de Grupos de um Usuário","WSCore_Autenticador"),
("grupos/inativar","Inativação Grupos","Permissão de inativação de Grupos","WSCore_Autenticador"),
("grupos/inativar/usuarios","Inativação Grupos","Permissão de inativação de Grupos de um Usuário","WSCore_Autenticador");

/* Cadastro de permissões de controle de perfis */ 
INSERT INTO _Permissoes (codigo,nome,descricao,modulo) VALUES
("perfis/lista","Listagem Perfis","Permissão de Listagem de Perfis","WSCore_Autenticador"),
("perfis/adicionar","Inclusão Perfis","Permissão de inclusão de Perfis","WSCore_Autenticador"),
("perfis/adicionar/usuario","Inclusão Perfis Usuários","Permissão de inclusão de Perfis a um Usuário","WSCore_Autenticador"),
("perfis/editar","Edição Perfis","Permissão de edição dos Perfis de um Usuário","WSCore_Autenticador"),
("perfis/editar/usuario","Edição Perfis Usuários","Permissão de edição dos Perfis de um Usuário","WSCore_Autenticador"),
("perfis/excluir","Exclusão Perfis","Permissão de exclusão de Perfis de um Usuário","WSCore_Autenticador"),
("perfis/excluir/usuario","Exclusão Perfis Usuários","Permissão de exclusão de Perfis de um Usuário","WSCore_Autenticador"),
("perfis/inativar","Inativação Perfis","Permissão de inativação de Perfis de um Usuário","WSCore_Autenticador"),
("perfis/inativar/usuario","Inativação Perfis Usuários","Permissão de inativação de Perfis de um Usuário","WSCore_Autenticador");

/* Cadastro de permissões de controle de permissões */ 
INSERT INTO _Permissoes (codigo,nome,descricao,modulo) VALUES
("permissoes/lista","Listagem Permissões","Permissão de Listagem de Permissões","WSCore_Autenticador"),
("permissoes/adicionar/usuario","Inclusão Permissões Usuário","Permissão de inclusão de Permissões ao Usuário","WSCore_Autenticador"),
("permissoes/adicionar/perfil","Inclusão Permissões Usuário","Permissão de inclusão de Permissões ao Perfil","WSCore_Autenticador"),
("permissoes/editar/usuario","Edição Permissões Usuário","Permissão de edição das Permissões do Usuário","WSCore_Autenticador"),
("permissoes/editar/perfil","Edição Permissões Perfil","Permissão de edição das Permissões do Perfil","WSCore_Autenticador"),
("permissoes/excluir/usuario","Exclusão Permissões Usuário","Permissão de exclusão de Permissões do Usuário","WSCore_Autenticador"),
("permissoes/excluir/perfil","Exclusão Permissões Perfil","Permissão de exclusão de Permissões do Perfil","WSCore_Autenticador"),
("permissoes/inativar/usuario","Inativação Permissões Usuário","Permissão de inativação de Permissões do Usuário","WSCore_Autenticador"),
("permissoes/inativar/perfil","Inativação Permissões Perfil","Permissão de inativação de Permissões do Perfil","WSCore_Autenticador");

/* Cadastro de permissões de telas */
INSERT INTO _Permissoes (codigo,nome,descricao,modulo) VALUES
("tela/cadastros/usuarios","Tela Cadastro Usuários","Tela de controle de cadastro de usuários de acesso ao sistema","WSCore_Autenticador"),
("tela/cadastros/grupos","Tela Cadastro Grupos","Tela de controle de cadastro de grupos de acesso ao sistema","WSCore_Autenticador"),
("tela/cadastros/perfis","Tela Cadastro Perfis","Tela de controle de cadastro de perfis de acesso ao sistema","WSCore_Autenticador"),
("tela/favoritos","Tela Favoritos","Tela de Favoritos","WSCore_Autenticador"),
("tela/cadastros/favoritos","Tela Cadastro Favoritos","Tela de controle de favoritos de usuários do sistema","WSCore_Autenticador");