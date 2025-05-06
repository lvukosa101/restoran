const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //nadodati zaštitu ruta ako je kasnije potrebno
const User = require('../models/User');
const Role = require('../models/Role');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { ime, prezime, email, lozinka, broj_tel, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Korisnik s tim emailom već postoji!' });
    }

    const hashedPassword = await bcrypt.hash(lozinka, 10);

    //dodijeljuje se rola gost ako se nije prije navelo
    const userRole = role || 'gost';
    const roleRecord = await Role.findOne({ where: { naziv_role: userRole } });

    const user = await User.create({
      ime,
      prezime,
      email,
      lozinka: hashedPassword,
      broj_tel: broj_tel || null,
      role_id: roleRecord.role_id
    });

    res.status(201).json({ message: 'Registracija uspješna!', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri registraciji!' });
  }
});

router.post('/login', async (req, res) => {
    const { email, lozinka } = req.body;
  
    try {
      const user = await User.findOne({ where: { email }, include: Role });
  
      if (!user) {
        return res.status(400).json({ message: 'Korisnik ne postoji!' });
      }
  
      const isMatch = await bcrypt.compare(lozinka, user.lozinka);
      if (!isMatch) {
        return res.status(400).json({ message: 'Pogrešna lozinka!' });
      }
  
      //generiranje JWT tokena
      const token = jwt.sign({ userId: user.korisnik_id, role: user.Role.naziv_role }, 'tajni_kljuc', { expiresIn: '1h' });
  
      res.json({
        token,
        user: {
          ime: user.ime,
          prezime: user.prezime,
          role: user.Role.naziv_role,
          email: user.email,
          korisnik_id: user.korisnik_id,
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Greška pri prijavi!' });
    }
  });
  

module.exports = router;
