const express = require('express');
const { body, validationResult } = require('express-validator');
const RegistrarLojaDTO = require('./RegistrarLojaDTO');
const camadaDePersistenciaDeLoja = require('./CamadaDePersistenciaDeLoja');

const app = express();
const PORT = 3000;

app.use(express.json());

const validacoesPost = [
  body('tipo').exists().isString().notEmpty(),
  body('nome').exists().isString().notEmpty(),
  body('descricao').exists().isString().notEmpty(),
  body('id_dono').exists().isNumeric(),
  body('localizacao.numero').exists().isNumeric(),
  body('localizacao.rua').exists().isString().notEmpty(),
  body('localizacao.bairro').exists().isString().notEmpty(),
  body('localizacao.cidade').exists().isString().notEmpty(),
  body('localizacao.estado').exists().isString().notEmpty(),
  body('itens').optional().isArray(),
];

app.post('/loja', validacoesPost, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const registrarLojaDTO = new RegistrarLojaDTO(req.body);
  camadaDePersistenciaDeLoja.adicionarLoja(registrarLojaDTO);

  res.status(200).json({ mensagem: 'Loja registrada com sucesso!' });
});

app.get('/loja', (req, res) => {
  const lojas = camadaDePersistenciaDeLoja.listarLojas();
  res.status(200).json(lojas);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.delete('/loja/:id', (req, res) => {
  const idLoja = parseInt(req.params.id);

  if (isNaN(idLoja)) {
    return res.status(400).json({ mensagem: 'ID invalido' });
  }

  const lojaExcluida = camadaDePersistenciaDeLoja.excluirLoja(idLoja);

  if (!lojaExcluida) {
    return res.status(404).json({ mensagem: 'Loja nao encontrada' });
  }

  res.status(200).json({ mensagem: 'Loja excluida com sucesso', loja: lojaExcluida });
});




/* 


curl -X POST \
  http://localhost:3000/loja \
  -H 'Content-Type: application/json' \
  -d '{
    "tipo": "restaurante",
    "nome": "Exemplo Restaurante",
    "descricao": "Uma descrição interessante",
    "id_dono": 1,
    "localizacao": {
      "numero": 123,
      "rua": "Rua Exemplo",
      "bairro": "Bairro Teste",
      "cidade": "Cidade Modelo",
      "estado": "RS"
    },
    "itens": ["item1", "item2", "item3"]
  }'



  curl -X DELETE http://localhost:3000/loja/1
*/