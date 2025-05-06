const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Role = require('./models/Role');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const addRoles = async () => {
  const roles = ['gost', 'moderator', 'administrator'];

  for (const role of roles) {
    const existingRole = await Role.findOne({ where: { naziv_role: role } });
    if (!existingRole) {
      await Role.create({ naziv_role: role });
      console.log(`Dodana uloga: ${role}`);
    }
  }
};

//ako je alter onda prilagodava tablice prema modelima bez brisanja podataka
sequelize.sync({ alter: true }).then(() => {
  addRoles();
  app.listen(5000, () => {
    console.log('Backend server pokrenut na portu 5000');
  });
}).catch((error) => {
  console.error('Greška pri pokretanju servera:', error);
});
