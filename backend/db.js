const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lvukosa', 'lvukosa', '11', {
  host: 'ucka.veleri.hr',
  dialect: 'mysql',
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Povezivanje s bazom podataka uspješno!');
  } catch (error) {
    console.error('Greška pri povezivanju s bazom:', error);
  }
};

testConnection();

module.exports = sequelize;
