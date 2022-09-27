/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo para criar ou editar  um recurso (JSON)
 */

/** Middleware:
 * 
 * Interceptador de requisições que pode interromper uma requisição
 * ou alterar dados de uma requisição 
*/

const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
/** 
  A linha abaixo aplica o midlleware para todas as rotas iniciadas
  por /users/:id (Alteração e deleção).
  Com ela poderia ser retirado o nome da função dos métodos put e delete
*/
app.use('/users/:id', validateUserId);

//Alterar
const users = [];

// Função que mostra logs para exemplificar midlleware
function logRequests(request, response, next) {
  const {method, url} =request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

}

app.use(logRequests); // Chama a função (midlleware) logRequests

function validateUserId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)) 
     return (response.status(400).json({ error: 'Invalid user ID. (Middleware)' }));

  return next();

}

// Listagem de usuários
app.get('/users', (request, response) => {
  const { name, email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep } = request.query;

  // Filtro (Query inserida no insomnia) por name
  results = name ?
    users.filter(user => user.name.includes(name)) :
    users;

  // Filtro (Query inserida no insomnia) por email
  results = email ?
    users.filter(user => user.email.includes(email)) :
    users;

  // Filtro
  results = cpf ?
  users.filter(user => user.cpf.includes(cpf)) :
  users;

  //Filtro
  results = telefone ?
  users.filter(user => user.telefone.includes(telefone)) :
  users;

  //Filtro
  results = logradouro ?
  users.filter(user => user.logradouro.includes(logradouro)) :
  users;

  // Filtro
  results = numero ?
  users.filter(user => user.numero.includes(numero)) :
  users;

  //Filtro
  results = complemento ?
  users.filter(user => user.complemento.includes(complemento)) :
  users;

  //Filtro
  results = bairro ?
  users.filter(user => user.bairro.includes(bairro)) :
  users;

  // Filtro
  results = cidade ?
  users.filter(user => user.cidade.includes(cidade)) :
  users;

  //Filtro
  results = estado ?
  users.filter(user => user.estado.includes(estado)) :
  users;

  //Filtro
  results = cep ?
  users.filter(user => user.cep.includes(cep)) :
  users;


  return response.json(results);
});

// Inclusão de usuários
app.post('/users', (request, response) => {
  const { name, email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep } = request.body;
  const id = uuid();

  const user = { id, name, email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep };
  users.push(user);

  return response.json(user);
});

// Alteração de usuários
app.put('/users/:id', validateUserId, (request, response) => {
  const { id } = request.params;
  const { name, email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep } = request.body;

  userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: 'User not Found'});
  }

  const user = { id, name, email, cpf, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep };

  users[userIndex] = user;

  return response.json(user);
});

// Deleção de usuários
app.delete('/users/:id', validateUserId, (request, response) => {
  const { id } = request.params;

  userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: 'User not Found'});
  }

  users.splice(userIndex, 1);

  return response.json({ 'delete': 'Successfully' });

});

app.listen(3333, () => {
  console.log('Servidor iniciado.')
});