const chai = require('chai');
const chaiHttp = require('chai-http');
const endpoint = require('../helper/endpoint-path');
const { authenticate } = require('../helper/auth');

chai.use(chaiHttp);

async function post(path, body, useAuth = false) {
  const req = chai.request(endpoint.baseUrl).post(path);

  if (useAuth) {
    const token = await authenticate();
    req.set('Authorization', `Bearer ${token}`);
  }

  return req.send(body);
}

async function get(path, useAuth = false) {
  const req = chai.request(endpoint.baseUrl).get(path);

  if (useAuth) {
    const token = await authenticate();
    req.set('Authorization', `Bearer ${token}`);
  }

  return req.send();
}

module.exports = {
  post,
  get
};
