const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

// dohvaca neiskorišten popust za korisnika
router.get('/:email', async (req, res) => {
  try {
    const popust = await Discount.findOne({
      where: {
        korisnik_email: req.params.email,
        iskoristen: false
      }
    });

    if (popust) {
      res.json(popust);
    } else {
      res.status(404).json({ message: 'Nema aktivnog popusta za korisnika.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Greška pri dohvaćanju podataka.' });
  }
});

// sprema novi popust ako već ne postoji
router.post('/', async (req, res) => {
  const { korisnik_email, kod, racuni } = req.body;

  /*console.log("Novi popust – primljen zahtjev:");
  console.log("Email:", korisnik_email);
  console.log("Kod:", kod);
  console.log("Računi:", racuni);*/

  try {
    const postoji = await Discount.findOne({
      where: {
        korisnik_email,
        iskoristen: false
      }
    });

    if (postoji) {
      return res.status(409).json({ message: 'Popust već postoji za ovog korisnika.' });
    }

    const novi = await Discount.create({
      korisnik_email,
      kod,
      racuni,
      iskoristen: false
    });

    res.status(201).json(novi);
  } catch (err) {
    //console.error("Greška u Discount.create():", err);
    res.status(500).json({ message: 'Greška pri spremanju popusta.' });
  }
});

// oznacava popust kao iskorišten
router.put('/iskoristi/:email', async (req, res) => {
  try {
    const azurirano = await Discount.update(
      { iskoristen: true },
      {
        where: {
          korisnik_email: req.params.email,
          iskoristen: false
        }
      }
    );

    if (azurirano[0] === 0) {
      return res.status(404).json({ message: 'Nema aktivnog popusta za označiti kao iskorišten.' });
    }

    res.json({ success: true, updated: azurirano });
  } catch (err) {
    res.status(500).json({ message: 'Greška pri označavanju popusta kao iskorištenog.' });
  }
});

router.get('/povijest/:email', async (req, res) => {
  try {
    const povijest = await Discount.findAll({
      where: {
        korisnik_email: req.params.email,
        iskoristen: true
      },
      order: [['updatedAt', 'DESC']]
    });

    res.json(povijest);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri dohvaćanju povijesti.' });
  }
});

module.exports = router;
