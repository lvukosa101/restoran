const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Reservation = sequelize.define("Reservation", {
  korisnik_ime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  korisnik_prezime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  korisnik_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  datum: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  vrijeme: {
    type: DataTypes.STRING, // promjena: više nije TIME
    allowNull: false
  },
  broj_stola: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  napomena: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Na čekanju"
  }
});

module.exports = Reservation;
