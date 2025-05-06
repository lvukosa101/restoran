const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  naziv_role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Role;
