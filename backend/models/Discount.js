const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Discount = sequelize.define('Discount', {
  korisnik_email: {
    type: DataTypes.STRING,
    allowNull: false,
    //unique: true
  },
  kod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  racuni: {
    type: DataTypes.JSON,
    allowNull: false
  },
  iskoristen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Discount;
