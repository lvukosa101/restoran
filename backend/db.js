const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lvukosa', 'lvukosa', '11', {
  host: 'ucka.veleri.hr',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4', // ✅ Rješava problem s cesu8 encodingom
  },
});

// ✅ Spoji se samo ako nije test okruženje
if (process.env.NODE_ENV !== 'test') {
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('Povezivanje s bazom podataka uspješno!');
    } catch (error) {
      console.error('Greška pri povezivanju s bazom:', error);
    }
  };

  testConnection();
}

module.exports = sequelize;
