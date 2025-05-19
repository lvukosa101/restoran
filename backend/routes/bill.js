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

// POST – Višestruki unos računa
router.post('/vise', async (req, res) => {
  const { korisnik_email, racuni } = req.body;

  if (!Array.isArray(racuni)) {
    return res.status(400).json({ message: 'Popis računa mora biti niz.' });
  }

  const rezultati = [];
  for (const broj_racuna of racuni) {
    try {
      const existing = await Bill.findOne({ where: { broj_racuna } });
      if (!existing) {
        const novi = await Bill.create({ korisnik_email, broj_racuna });
        rezultati.push(novi);
      }
    } catch (err) {
      console.error(`❌ Greška za račun ${broj_racuna}:`, err.message);
    }
  }

  res.json({ spremljeno: rezultati.length, racuni: rezultati });
});

module.exports = router;
