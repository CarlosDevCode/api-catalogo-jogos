const express = require('express');
const router = express.Router();

// "Banco de dados" em memória
let jogos = [
  { id: 1, titulo: 'The Legend of Zelda: Breath of the Wild', plataforma: 'Nintendo Switch', genero: 'Aventura', anoLancamento: 2017 },
  { id: 2, titulo: 'God of War', plataforma: 'PlayStation 4', genero: 'Ação', anoLancamento: 2018 },
  { id: 3, titulo: 'Halo Infinite', plataforma: 'Xbox Series X', genero: 'Tiro', anoLancamento: 2021 },
];
let proximoId = 4;

// Verifica se os 4 campos foram informados
function camposValidos(body) {
  const { titulo, plataforma, genero, anoLancamento } = body || {};
  const textoOk = (v) => typeof v === 'string' && v.trim() !== '';
  return (
    textoOk(titulo) &&
    textoOk(plataforma) &&
    textoOk(genero) &&
    anoLancamento !== undefined &&
    anoLancamento !== null &&
    anoLancamento !== ''
  );
}

// GET /jogos - lista todos
router.get('/', (req, res) => {
  res.status(200).json(jogos);
});

// GET /jogos/:id - consulta por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const jogo = jogos.find((j) => j.id === id);

  if (!jogo) {
    return res.status(404).json({ mensagem: 'Jogo não encontrado' });
  }
  res.status(200).json(jogo);
});

// POST /jogos - cadastra novo jogo
router.post('/', (req, res) => {
  if (!camposValidos(req.body)) {
    return res.status(400).json({
      mensagem: 'Os campos titulo, plataforma, genero e anoLancamento são obrigatórios',
    });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;
  const novoJogo = { id: proximoId++, titulo, plataforma, genero, anoLancamento };
  jogos.push(novoJogo);

  res.status(201).json(novoJogo);
});

// PUT /jogos/:id - atualiza todos os dados de um jogo
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = jogos.findIndex((j) => j.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Jogo não encontrado' });
  }

  if (!camposValidos(req.body)) {
    return res.status(400).json({
      mensagem: 'Os campos titulo, plataforma, genero e anoLancamento são obrigatórios',
    });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;
  jogos[indice] = { id, titulo, plataforma, genero, anoLancamento };

  res.status(200).json(jogos[indice]);
});

// DELETE /jogos/:id - remove um jogo
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = jogos.findIndex((j) => j.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Jogo não encontrado' });
  }

  const [removido] = jogos.splice(indice, 1);
  res.status(200).json({ mensagem: 'Jogo removido com sucesso', jogo: removido });
});

module.exports = router;
