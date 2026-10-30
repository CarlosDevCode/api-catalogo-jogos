# 🎮 Catálogo de Jogos - API REST

API REST desenvolvida com **Node.js** e **Express.js** para gerenciar um catálogo de jogos eletrônicos. Os dados ficam armazenados em memória (um array), sem uso de banco de dados.

Projeto prático criado para praticar os fundamentos de APIs REST: rotas, métodos HTTP, status codes, validações, middlewares e organização de código.

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Postman](https://www.postman.com/) (testes dos endpoints)

## 📁 Estrutura do projeto

```
catalogo-jogos/
├── routes/
│   └── jogos.js                              # Rotas e regras da API
├── server.js                                 # Configuração e inicialização do servidor
├── catalogo-jogos.postman_collection.json    # Coleção do Postman com os testes
└── package.json
```

## 🧩 Modelo de dados

```json
{
  "id": 1,
  "titulo": "The Legend of Zelda: Breath of the Wild",
  "plataforma": "Nintendo Switch",
  "genero": "Aventura",
  "anoLancamento": 2017
}
```

## 📌 Endpoints

| Método | Endpoint      | Descrição                          | Status de sucesso |
|--------|---------------|------------------------------------|-------------------|
| GET    | `/jogos`      | Lista todos os jogos               | 200               |
| GET    | `/jogos/:id`  | Consulta um jogo pelo ID           | 200               |
| POST   | `/jogos`      | Cadastra um novo jogo              | 201               |
| PUT    | `/jogos/:id`  | Atualiza todos os dados de um jogo | 200               |
| DELETE | `/jogos/:id`  | Remove um jogo do catálogo         | 200               |

### Respostas de erro

| Situação                                                        | Status |
|-----------------------------------------------------------------|--------|
| Campos obrigatórios ausentes no cadastro ou na atualização      | 400    |
| JSON inválido no corpo da requisição                            | 400    |
| ID não encontrado (consulta, atualização ou exclusão)           | 404    |
| Rota inexistente                                                | 404    |

## ⚙️ Como executar

**Pré-requisito:** [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd catalogo-jogos

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm start
```

O servidor ficará disponível em `http://localhost:3000`.

## 📬 Exemplos de requisição

**Cadastrar um jogo** (`POST /jogos`)

```json
{
  "titulo": "Hollow Knight",
  "plataforma": "PC",
  "genero": "Metroidvania",
  "anoLancamento": 2017
}
```

Resposta (`201 Created`):

```json
{
  "id": 4,
  "titulo": "Hollow Knight",
  "plataforma": "PC",
  "genero": "Metroidvania",
  "anoLancamento": 2017
}
```

**Cadastro com campos faltando** (`POST /jogos`) → `400 Bad Request`

```json
{
  "mensagem": "Os campos titulo, plataforma, genero e anoLancamento são obrigatórios"
}
```

**Jogo não encontrado** (`GET /jogos/99`) → `404 Not Found`

```json
{
  "mensagem": "Jogo não encontrado"
}
```

## 🧪 Testes com Postman

1. Inicie o servidor com `npm start`.
2. No Postman, clique em **Import** e selecione o arquivo `catalogo-jogos.postman_collection.json`.
3. Execute os requests em ordem ou use o **Collection Runner** para rodar todos de uma vez.

A coleção possui 10 requests com testes automáticos que validam os status codes e o corpo das respostas.

## 📝 Funcionalidades implementadas

- CRUD completo de jogos
- Validação dos campos obrigatórios (400)
- Verificação de existência do ID (404)
- Middleware que registra no console o método HTTP e a URL de cada requisição
- Tratamento de rotas inexistentes com resposta em JSON
- Código organizado em arquivos separados para servidor e rotas
