const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const Ajv = require('ajv');
const endpoint = require('../../src/helper/endpoint-path');
const schema = require('../../src/helper/response-schema/getJsonSchema.json');
const reporter = require('../../src/helper/reporter');

chai.use(require('chai-http'));
const expect = chai.expect;
const ajv = new Ajv();

let response;

Given('The GET API endpoint for users', function () {
  this.url = `${endpoint.baseUrl}${endpoint.users}`;
});

When(/^I send GET request to \/usuarios$/, async function () {
  response = await chai.request(endpoint.baseUrl)
    .get(endpoint.users);

  reporter.addResponse(response);
});

Then('I receive response HTTP 200 OK', function () {
  expect(response).to.have.status(200);
});

Then(/^I receive a valid response body for GET \/usuarios$/, function () {
  const validate = ajv.compile(schema);
  const valid = validate(response.body);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }

  expect(valid, JSON.stringify(validate.errors)).to.be.true;
});
