const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

  const bcrypt = require('bcrypt');
  const isMatch = await bcrypt.compare(staraLozinka, user.lozinka);
  if (!isMatch) return res.status(400).json({ message: 'Stara lozinka nije točna' });

  const hashed = await bcrypt.hash(novaLozinka, 10);
  user.lozinka = hashed;
  await user.save();
  res.json({ message: 'Lozinka ažurirana' });
});


module.exports = router;
