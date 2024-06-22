const Cell = require('./cell');
const sequelize = require('../config/database');

const db = {
  Cell,
  sequelize,
  Sequelize: require('sequelize'),
};

module.exports = db;
