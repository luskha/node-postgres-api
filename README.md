# node-postgres-api

Aplicação para revisão de estudo com:

NodeJs, nodemon, PostgreSQL, fastify, cors, dotenv.

Objetivo: Criar uma api de produtos usando o Postgres para persisitir os dados usando alguma biblioteca, por exemplo: pg

1 - Criar um servidor que ao subir retorne no path '/':

```json
{
  "code": 200,
  "status": "UP",
  "message": "Servidor Rodando!"
}
```

Utlizando nodemon, fastify e _type: module_.

2 - Condigurar a conexão da biblioteca [pg](https://www.npmjs.com/package/pg). No link possui a doc. Aparecer no log que o banco está conectado.

colunas da tabela produto:

nome,
descricao,
desconto,
preco,
ativo,
categoria,
data_cadastro,

3 - Endpoints:

GET /produto
GET /produtos
GET /produto/?status=ativo
POST /produto
PUT /produto/:id
PATCH /produto/:id
DELETE /produto/:id

