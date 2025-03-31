const { faker } = require('@faker-js/faker');

module.exports = {
  newUser: () => ({
    nome: faker.firstName(),
    email: faker.internet.email(),
    password: "123456",
    administrador: "true"
  }),
  login: (email, password) => ({
    email,
    password
  })
};
