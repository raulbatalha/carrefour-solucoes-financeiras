require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL || 'https://serverest.dev',
  users: '/usuarios',
  login: '/login'
};
