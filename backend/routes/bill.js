const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// POST – Dodaj jedan broj računa
router.post('/', async (req, res) => {
  try {
    const { korisnik_email, broj_racuna } = req.body;

    const existing = await Bill.findOne({ where: { broj_racuna } });
    if (existing) {
      return res.status(409).json({ message: 'Račun već postoji.' });
    }

    const novi = await Bill.create({ korisnik_email, broj_racuna });
    res.status(201).json(novi);
  } catch (err) {
    console.error('❌ Greška pri unosu računa:', err);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

router.post('/vise', async (req, res) => {
  const { korisnik_email, racuni } = req.body;

  if (!Array.isArray(racuni) || racuni.length !== 5) {
    return res.status(400).json({ message: 'Točno 5 računa je potrebno poslati.' });
  }

  try {
    const postojeci = await Bill.findAll({
      where: {
        broj_racuna: racuni
      }
    });

    if (postojeci.length > 0) {
      const vecPostoje = postojeci.map(r => r.broj_racuna);
      return res.status(409).json({
        message: 'Neki računi već postoje.',
        duplicirani: vecPostoje
      });
    }

    const spremljeni = await Promise.all(
      racuni.map(broj_racuna =>
        Bill.create({ korisnik_email, broj_racuna })
      )
    );

    return res.status(201).json({
      spremljeno: spremljeni.length,
      racuni: spremljeni
    });
  } catch (err) {
    console.error('Greška pri unosu računa:', err);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});


module.exports = router;
