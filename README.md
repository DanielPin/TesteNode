

## Teste Técnico

Desenvolvido para o posição de Backend NodeJs

## Requisitos para execução
Ter o docker compose instalado

## Instalação

Executar o comando abaixo na pasta raiz do projeto
```bash
$ docker-compose up --build
```

## EndPoints

Cadastrar Colaborador

Método: POST

localhost:3000/collaborator

Exemplo de cadastro:

```json
{
  "name": "Mario da Silva",
  "email": "mario@dev.com",
  "telephone": "11989899898",
  "cpf": "22222222222",
  "sector": {
    "id":2
  }
}
```

##
Listar colaboradores

Método: GET

localhost:3000/collaborator

Exemplo de retorno:

```json
{
  "Desenvolvimento": [
    {
      "name": "Mario da Silva",
      "email": "mario@dev.com"
    },
    {
      "name": "Marinaldo da Silva",
      "email": "marinaldo@gmail.com"
    }
  ],
  "Administracao": [
    {
      "name": "José da Silva",
      "email": "jose@gmail.com"
    }
  ]
}
```
##
Buscar Por Cpf

Método: Get
 
localhost:3000/collaborator/222222

Exemplo de retorno:

```json
{
  "id": 1,
  "name": "Mario da Silva",
  "cpf": "22222222222",
  "email": "mario@dev.com",
  "sector": {
    "id": 2,
    "description": "Desenvolvimento"
  }
}
```

##
Deletar colaborador

Método: DELETE
 
localhost:3000/collaborator/222222

Exemplo de retorno:

```json
{  
  "name": "Mario da Silva",
  "cpf": "22222222222",
  "email": "mario@dev.com",
  "sector": {
    "id": 2,
    "description": "Desenvolvimento"
  }
}
```


## Scripts do banco de dados

[Script](https://github.com/DanielPin/TesteNode/blob/master/script.sql)

## Comando para executar os testes

```
npm run test
```
