create database mobiakross;

create table setores(
    id serial primary key,
    descricao varchar(255)
);

create table colaboradores(
    id serial primary key,
    nome varchar(255),
    email varchar(255),
    telefone varchar(11),
    cpf varchar(11),
    setor_id int,
    constraint fk_setor foreign key (setor_id) references setores(id)
);

insert into setores (descricao)
values ('Administracao');

insert into setores (descricao)
values ('Desenvolvimento');

insert into setores (descricao)
values ('Financeiro');