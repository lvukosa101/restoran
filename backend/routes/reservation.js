const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');
const { transporter } = require('./contact');

// POST – nova rezervacija
router.post('/', verifyToken, async (req, res) => {
  try {
    const { datum, vrijeme, broj_stola } = req.body;

    //console.log("🔽 Novi zahtjev za rezervaciju:", req.body);

    const existing = await Reservation.findOne({
      where: { datum, vrijeme, broj_stola }
    });

    if (existing) {
      return res.status(409).json({ message: 'Stol je već rezerviran za odabrani termin.' });
    }

    const novaRezervacija = await Reservation.create(req.body);
    res.status(201).json(novaRezervacija);
  } catch (error) {
    console.error('❌ Greška pri kreiranju rezervacije:', error.message, error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

// GET – sve rezervacije
router.get('/', async (req, res) => {
  try {
    const sve = await Reservation.findAll({
      order: [['datum', 'ASC'], ['vrijeme', 'ASC']]
    });
    res.json(sve);
  } catch (error) {
    console.error('❌ Greška pri dohvaćanju rezervacija:', error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

//put - promjena statusa - konobar ili administrator
router.put('/:id/status', verifyToken, allowRoles('moderator', 'administrator'), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const rezervacija = await Reservation.findByPk(id);
    if (!rezervacija) {
      return res.status(404).json({ message: 'Rezervacija nije pronađena.' });
    }

    rezervacija.status = status;
    await rezervacija.save();

    const poruka =
      status === 'Odobreno'
        ? 'Vaša rezervacija je <strong>ODOBRENA</strong>. Vidimo se u restoranu! 🍽️'
        : 'Nažalost, vaša rezervacija je <strong>ODBIJENA</strong>. Pokušajte s drugim terminom.';

    const mailOptions = {
      from: '"Restoran Delicije" <laura1331.lz@gmail.com>',
      to: rezervacija.korisnik_email,
      subject: `Rezervacija - ${status}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#2c3e50;">Obavijest o rezervaciji</h2>
          <p>Poštovani <strong>${rezervacija.korisnik_ime} ${rezervacija.korisnik_prezime}</strong>,</p>
          <p>${poruka}</p>
          <table style="margin-top:20px;">
            <tr><td><strong>Datum:</strong></td><td>${rezervacija.datum}</td></tr>
            <tr><td><strong>Vrijeme:</strong></td><td>${rezervacija.vrijeme}</td></tr>
            <tr><td><strong>Stol:</strong></td><td>${rezervacija.broj_stola}</td></tr>
          </table>
          <p style="margin-top:25px;">Zahvaljujemo na korištenju našeg sustava rezervacija!</p>
          <p><em>Vaš restoran</em></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Status ažuriran i email poslan.', rezervacija });
  } catch (error) {
    console.error('❌ Greška pri ažuriranju statusa:', error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

// GET – zauzeti termini za odabrani datum
router.get('/zauzeti-termini', async (req, res) => {
  try {
    const { datum } = req.query;

    if (!datum) {
      return res.status(400).json({ message: 'Datum je obavezan.' });
    }

    const rezervacije = await Reservation.findAll({
      where: { datum },
      attributes: ['vrijeme'],
    });

    const zauzetiTermini = [...new Set(rezervacije.map(r => r.vrijeme))];
    res.json(zauzetiTermini);
  } catch (error) {
    console.error('❌ Greška pri dohvaćanju zauzetih termina:', error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

// GET – zauzeti termini za određeni datum i stol
router.get('/zauzeti-termini-za-stol', async (req, res) => {
  try {
    const { datum, broj_stola } = req.query;

    if (!datum || !broj_stola) {
      return res.status(400).json({ message: 'Datum i broj stola su obavezni.' });
    }

    const rezervacije = await Reservation.findAll({
      where: { datum, broj_stola },
      attributes: ['vrijeme'],
    });

    const zauzetiTermini = [...new Set(rezervacije.map(r => r.vrijeme))];
    res.json(zauzetiTermini);
  } catch (error) {
    console.error('❌ Greška pri dohvaćanju termina za stol:', error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

// zauzeti stolovi po terminu za određeni datum
router.get('/zauzeti-termini-po-datumu', async (req, res) => {
  try {
    const { datum } = req.query;

    if (!datum) {
      return res.status(400).json({ message: 'Datum je obavezan.' });
    }

    const rezervacije = await Reservation.findAll({
      where: { datum },
      attributes: ['vrijeme', 'broj_stola'],
    });

    const rezultat = {};

    for (const rez of rezervacije) {
      const vrijeme = rez.vrijeme.slice(0, 5); // npr. '12:00:00' → '12:00'
      if (!rezultat[vrijeme]) rezultat[vrijeme] = [];
      rezultat[vrijeme].push(rez.broj_stola);
    }

    res.json(rezultat);
  } catch (error) {
    console.error('❌ Greška pri dohvaćanju zauzetih termina po datumu:', error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

// DELETE – brisanje rezervacije po ID-u - konobar ili admin
router.delete('/:id', verifyToken, allowRoles('moderator', 'administrator'), async (req, res) => {
  try {
    const { id } = req.params;

    const rezervacija = await Reservation.findByPk(id);
    if (!rezervacija) {
      return res.status(404).json({ message: 'Rezervacija nije pronađena.' });
    }

    await rezervacija.destroy();
    res.json({ message: 'Rezervacija obrisana.' });
  } catch (error) {
    console.error('❌ Greška pri brisanju rezervacije:', error);
    res.status(500).json({ message: 'Greška na poslužitelju.' });
  }
});

module.exports = router;
