require('dotenv').config(); 
const Sequelize = require('sequelize');
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: DB_HOST, 
  port: DB_PORT, 
  username: DB_USERNAME, 
  password: DB_PASSWORD, 
  database: DB_DATABASE 
});

module.exports = sequelize;