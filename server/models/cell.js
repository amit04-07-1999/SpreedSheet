const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cell = sequelize.define('Cell', {
  row: { type: DataTypes.INTEGER, allowNull: false },
  column: { type: DataTypes.INTEGER, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true, // Ensure timestamps are enabled
});

module.exports = Cell;
