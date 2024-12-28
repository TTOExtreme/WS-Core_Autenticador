
/* Cadastro dos menus do sistema */
INSERT INTO _Menus (codigo,nome,descricao,menu_pai,versao,permissao,modulo,evento,load_dependencia,configuracao) VALUES
("menu/cadastros","Menu Cadastros","Controle de cadastros da plataforma.","","0.0.1","tela/usuarios/controle","TurboWS_Autenticador","open/menu/cadastros","","{\"menu_icon\":\"settings\"}");

/* Cadastro de sub menus do usuarios */ 
INSERT INTO _Menus (codigo,nome,descricao,menu_pai,versao,permissao,modulo,evento,load_dependencia,configuracao) VALUES
("menu/cadastros/usuarios","Usuários","Controle de usuários de acesso a plataforma.","menu/cadastros","0.0.1","tela/cadastros/usuarios","TurboWS_Autenticador","open/menu/cadastros/usuarios","./modulo/Autenticador/js/Usuarios.js","{\"menu_icon\":\"person\"}"),
("menu/cadastros/grupos","Grupos","Controle de Grupos de Usuários","menu/cadastros","0.0.1","tela/cadastros/grupos","TurboWS_Autenticador","open/menu/cadastros/usuarios","./modulo/Autenticador/js/Grupos.js","{\"menu_icon\":\"group\"}"),
("menu/cadastros/perfis","Perfis","Controle de Perfis de Usuários","menu/cadastros","0.0.1","tela/cadastros/perfis","TurboWS_Autenticador","open/menu/cadastros/usuarios","./modulo/Autenticador/js/Perfis.js","{\"menu_icon\":\"passkey\"}");