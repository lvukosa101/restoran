const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Role = require('./Role');

const User = sequelize.define('User', {
  korisnik_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prezime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  lozinka: {
    type: DataTypes.STRING,
    allowNull: false
  },
  broj_tel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'role_id'
    }
  }
});

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
