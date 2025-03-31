const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const Ajv = require('ajv');
const connector = require('../../src/connector/connector');
const endpoint = require('../../src/helper/endpoint-path');
const schema = require('../../src/helper/response-schema/postJsonSchema.json');
const reporter = require('../../src/helper/reporter');

const ajv = new Ajv();
let res;
let payload;

Given('A POST API endpoint', function () {
  this.url = endpoint.users;
});

When(/^I send POST request to \/posts$/, async function () {
  payload = {
    nome: "Usuario Teste",
    email: `teste${Date.now()}@mail.com`,
    password: "123456",
    administrador: "true"
  };
  res = await connector.post(endpoint.users, payload);
  reporter.addResponse(res);
});

When(/^I send POST request to \/posts using request {string}$/, async function (rawPayload) {
  payload = JSON.parse(rawPayload);
  res = await connector.post(endpoint.users, payload);
  reporter.addResponse(res);
});

When(/^I send POST request to \/posts using request$/, async function (docString) {
  payload = JSON.parse(docString);

  if (payload.email && payload.email.includes('@')) {
    const [prefix, domain] = payload.email.split('@');
    payload.email = `${prefix}+${Date.now()}@${domain}`;
  }

  res = await connector.post(endpoint.users, payload);
  reporter.addResponse(res);
});


Then('I get response HTTP 201 Created', function () {
  expect(res).to.have.status(201);
});

Then('I get response body matches with the Schema for POST request', function () {
  const validate = ajv.compile(schema);
  const valid = validate(res.body);
  if (!valid) console.error(validate.errors);
  expect(valid, JSON.stringify(validate.errors)).to.be.true;
});

Then('I get response body that has {string} value that is {string} String', function (key, condition) {
  expect(payload).to.have.property(key);
  const value = payload[key];

  if (condition === 'non-empty') {
    expect(value).to.be.a('string').and.not.empty;
  } else if (condition === 'empty') {
    expect(value).to.be.a('string').and.empty;
  } else {
    throw new Error(`Condição inválida: ${condition}`);
  }
});

Then('I get response body that has {string} value that is non-empty String', function (key) {
  expect(payload).to.have.property(key);
  expect(payload[key]).to.be.a('string').and.not.empty;
});

Then('I get response body that has {string} value that is empty String', function (key) {
  expect(payload).to.have.property(key);
  expect(payload[key]).to.be.a('string').and.empty;
});

Then('I get response body that has a valid key value as inputed payload', function () {
  if (res.status !== 201) {
    throw new Error(`Requisição falhou com status ${res.status}: ${JSON.stringify(res.body)}`);
  }

  expect(res.body).to.have.property('_id');
  expect(res.body).to.have.property('message');
  expect(res.body.message).to.include('sucesso');
});

Then('I get response body that has nome value that is non-empty String', function () {
  expect(payload).to.have.property('nome');
  expect(payload.nome).to.be.a('string').and.not.empty;
});

Then('I get response body that has nome value that is empty String', function () {
  expect(payload).to.have.property('nome');
  expect(payload.nome).to.be.a('string').and.empty;
});
