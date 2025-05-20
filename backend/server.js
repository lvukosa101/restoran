const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Role = require('./models/Role');

const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservation');
const billRoutes = require('./routes/bill');
const discountRoutes = require('./routes/discount');
const contactRoute = require('./routes/contact');

const app = express();



app.use(cors());
app.use(express.json());

// API rute
app.use('/api/auth', authRoutes);
app.use('/api/rezervacije', reservationRoutes);
app.use('/api/racuni', billRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/kontakt', contactRoute);

// Dodavanje uloga
const addRoles = async () => {
  const roles = ['gost', 'moderator', 'administrator'];
  for (const role of roles) {
    const [instance, created] = await Role.findOrCreate({
      where: { naziv_role: role },
      defaults: {}
    });

    if (created) {
      console.log(`✅ Dodana uloga: ${role}`);
    }
  }
};

sequelize.sync()
  .then(async () => {
    console.log('Baza povezana i sinkronizirana.');
    await addRoles();
    app.listen(5000, () => {
      console.log('Backend server pokrenut na http://localhost:5000');
    });
  })
  .catch(err => {
    console.error('Greška pri pokretanju servera:', err);
  });

  //sequelize.sync({ alter: true })