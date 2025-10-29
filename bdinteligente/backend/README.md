# API - Almoxarifado Inteligente

API feita em **Node.js + Express + MySQL**  
Funções: controle de estoque, entradas, saídas, empréstimos e funcionários.

---

## Comandos

### ITENS
- **GET** `/api/itens` → lista todos os itens  
- **GET** `/api/itens/:id` → mostra 1 item específico  
- **POST** `/api/itens`  
exemplo :
```json
  {
    "nome": "Arduino Uno R3",
    "descricao": "Placa de prototipagem",
    "quantidade": 10,
    "unidade": "un",
    "tag_id": "ARD-UNO-004",
    "tag_material": "ELETRONICO",
    "estoque_minimo": 3
  }
PUT /api/itens/:id → atualiza um item

DELETE /api/itens/:id → deleta um item

### ENTRADAS
GET /api/entradas → lista todas as entradas

POST /api/entradas
exemplo:
json
Copiar código
{
  "id_item": 1,
  "quantidade": 10,
  "responsavel": "João Silva",
  "observacao": "Reposição de estoque"
}
## SAÍDAS
GET /api/saidas → lista todas as saídas

POST /api/saidas

json
Copiar código
{
  "id_item": 2,
  "quantidade": 5,
  "responsavel": "Maria Souza",
  "destino": "Sala de aula 02",
  "tipo_saida": "consumo",
  "observacao": "Uso em aula prática"
}
EMPRÉSTIMOS:
GET /api/emprestimos → lista todos os empréstimos

POST /api/emprestimos

json
Copiar código
{
  "itens_id": 3,
  "funcionario_id": 5,
  "data_prevista_devolucao": "2025-11-15",
  "responsavel": "Claudio Santos",
  "observacao": "Uso em projeto de alunos"
}
PUT /api/emprestimos/:id → atualiza o status ou observação

DELETE /api/emprestimos/:id → exclui um empréstimo

FUNCIONÁRIOS:
GET /api/funcionarios → lista todos os funcionários

GET /api/funcionarios/:id → mostra 1 funcionário específico

POST /api/funcionarios

json
Copiar código
{
  "nome": "Paula Rodrigues",
  "email": "paula@senai.com",
  "funcao": "Coordenação Pedagógica",
  "telefone": "(11) 90000-0000",
  "id_cargo": 3
}
PUT /api/funcionarios/:id → atualiza dados do funcionário

DELETE /api/funcionarios/:id → remove funcionário

RELATÓRIOS
GET /api/relatorio/mensal → retorna resumo de movimentações do mês (baseado em entradas e saídas)

GET /api/relatorio/estoque-baixo → lista itens com estoque abaixo do mínimo

GET /api/relatorio/funcionarios-itens → mostra relação de funcionário x item emprestado/retirado

Estrutura do projeto
Pasta / Arquivo	Função
config/db.js	Faz a conexão com o banco
controllers/	Executa as ações de cada rota (GET, POST, etc.)
models/	Contém os comandos SQL que interagem com o banco
routes/	Define as URLs e chama os controllers
app.js	Junta todas as rotas e exporta para o servidor
server.js	Sobe a API na porta definida no .env
.env	Guarda as variáveis de ambiente (DB, porta, etc.)
package.json	Configuração do projeto e scripts



Observações: IMPORTANTE

Banco: almoxarifado_inteligente

Porta padrão: 3000

Ao inserir uma entrada ou saída, o estoque é atualizado automaticamente por triggers.

A view vw_funcionarios_itens mostra a relação de funcionário + item + tipo de movimentação.

Os relatórios usam stored procedures e views para facilitar consulTA