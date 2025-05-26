const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Role = require('../models/Role');

router.put('/update', async (req, res) => {
  const { korisnik_id, ime, prezime, email, broj_tel } = req.body;

  try {
    const user = await User.findByPk(korisnik_id);
    if (!user) return res.status(404).json({ poruka: "Korisnik nije pronađen" });

    user.ime = ime;
    user.prezime = prezime;
    user.email = email;
    user.broj_tel = broj_tel;

    await user.save();

    res.json({ poruka: "Korisnik ažuriran", user });
  } catch (err) {
    console.error("Greška u update ruti:", err);
    res.status(500).json({ poruka: "Greška pri ažuriranju korisnika" });
  }
});

router.put('/update-password', async (req, res) => {
  const { korisnik_id, staraLozinka, novaLozinka } = req.body;
  const user = await User.findByPk(korisnik_id);
  if (!user) return res.status(404).json({ message: 'Korisnik nije pronađen' });

  const isMatch = await bcrypt.compare(staraLozinka, user.lozinka);
  if (!isMatch) return res.status(400).json({ message: 'Stara lozinka nije točna' });

  const hashed = await bcrypt.hash(novaLozinka, 10);
  user.lozinka = hashed;
  await user.save();
  res.json({ message: 'Lozinka ažurirana' });
});

router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (err) {
    console.error('Greška pri dohvaćanju uloga:', err);
    res.status(500).json({ message: 'Greška pri dohvaćanju uloga.' });
  }
});

router.post('/', async (req, res) => {
  const { ime, prezime, email, lozinka, broj_tel, role_id } = req.body;

  try {
    const postoji = await User.findOne({ where: { email } });
    if (postoji) {
      return res.status(400).json({ message: 'Korisnik s ovim emailom već postoji.' });
    }

    const hashed = await bcrypt.hash(lozinka, 10);

    const novi = await User.create({
      ime,
      prezime,
      email,
      lozinka: hashed,
      broj_tel,
      role_id
    });

    res.status(201).json({ message: 'Korisnik dodan.', korisnik: novi });
  } catch (err) {
    console.error('❌ Greška pri dodavanju korisnika:', err);
    res.status(500).json({ message: 'Greška na serveru.' });
  }
});

module.exports = router;
