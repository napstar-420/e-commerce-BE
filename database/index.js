const knex = require('knex');
const knexConfig = require('./config');

const db = knex(knexConfig);

module.exports = db;
