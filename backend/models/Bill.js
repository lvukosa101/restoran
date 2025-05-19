const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bill = sequelize.define('Bill', {
  korisnik_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  broj_racuna: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true  // ❗ jedinstveni račun
  }
});

module.exports = Bill;
