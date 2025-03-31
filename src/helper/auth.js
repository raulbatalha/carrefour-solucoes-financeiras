require('dotenv').config();
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const endpoint = require('./endpoint-path');
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);

let token = null;

function saveTokenToFile(jwt) {
  fs.writeFileSync('token.txt', jwt, { encoding: 'utf8' });
  console.log('[INFO] Token JWT salvo em token.txt');
}

async function createUserAndLogin() {
  const userData = {
    nome: faker.firstName(),
    email: `user${Date.now()}@mail.com`,
    password: '123456',
    administrador: 'true'
  };

  const userRes = await chai.request(endpoint.baseUrl)
    .post(endpoint.users)
    .send(userData);

  if (userRes.status !== 201 || !userRes.body._id) {
    throw new Error(`Erro ao criar usuário: ${userRes.status}`);
  }

  const loginRes = await chai.request(endpoint.baseUrl)
    .post(endpoint.login)
    .send({ email: userData.email, password: userData.password });

  if (loginRes.status === 200 && loginRes.body.authorization) {
    token = loginRes.body.authorization;
    saveTokenToFile(token);
    return token;
  }

  throw new Error(`Login falhou: ${loginRes.status} - ${loginRes.text}`);
}

async function authenticate() {
  if (token) return token;
  return await createUserAndLogin();
}

module.exports = { authenticate };
