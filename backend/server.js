const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Role = require('./models/Role');

const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservation');
const billRoutes = require('./routes/bill'); // ruta za račune

const app = express();



app.use(cors());
app.use(express.json());

// API rute
app.use('/api/auth', authRoutes);
app.use('/api/rezervacije', reservationRoutes);
app.use('/api/racuni', billRoutes); // ispravno dodana ruta

// Dodavanje uloga
const addRoles = async () => {
  const roles = ['gost', 'moderator', 'administrator'];
  for (const role of roles) {
    const existing = await Role.findOne({ where: { naziv_role: role } });
    if (!existing) {
      await Role.create({ naziv_role: role });
      console.log(`✅ Dodana uloga: ${role}`);
    }
  }
};

// Pokretanje servera
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('📦 Baza sinkronizirana.');
    await addRoles();
    app.listen(5000, () => {
      console.log('🚀 Backend server pokrenut na http://localhost:5000');
    });
  })
  .catch(err => {
    console.error('❌ Greška pri pokretanju servera:', err);
  });
