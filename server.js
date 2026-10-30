const express = require('express');
const jogosRouter = require('./routes/jogos');

const app = express();
const PORT = 3000;

// Permite receber requisições com corpo JSON
app.use(express.json());

// Middleware de log: método HTTP e URL de cada requisição
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Rotas da API
app.use('/jogos', jogosRouter);

// Tratamento de rotas inexistentes (deve vir depois de todas as rotas)
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// Tratamento de JSON malformado no corpo da requisição
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ mensagem: 'JSON inválido no corpo da requisição' });
  }
  console.error(err);
  res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
