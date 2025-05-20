const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { ime, email, telefon, poruka } = req.body;

  if (!ime || !email || !poruka) {
    return res.status(400).json({ message: 'Sva obavezna polja moraju biti ispunjena.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'laura1331.lz@gmail.com',
        pass: 'faoa kghd gmpg liys',
      },
    });

    const adminMail = {
      from: email,
      to: 'laura1331.lz@gmail.com',
      subject: 'Nova kontakt poruka s weba',
      text: `Ime: ${ime}\nEmail: ${email}\nTelefon: ${telefon}\nPoruka:\n${poruka}`,
    };

    const userMail = {
      from: 'laura1331.lz@gmail.com',
      to: email,
      subject: 'Potvrda zaprimljene poruke - Restoran Delicije',
      text: `Pozdrav ${ime},\n\nHvala što ste nas kontaktirali. Vaša poruka je zaprimljena i odgovoriti ćemo vam uskoro.\n\nVaša poruka:\n${poruka}\n\nSrdačno,\nRestoran Delicije`,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.json({ success: true, message: 'Poruka poslana!' });
  } catch (err) {
    console.error("Greška pri slanju maila:", err);
    res.status(500).json({ message: 'Greška pri slanju e-maila.' });
  }
});

module.exports = router;
