const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'laura1331.lz@gmail.com',
    pass: 'faoa kghd gmpg liys',
  },
});

router.post('/', async (req, res) => {
  const { ime, email, telefon, poruka } = req.body;

  if (!ime || !email || !poruka) {
    return res.status(400).json({ message: 'Sva obavezna polja moraju biti ispunjena.' });
  }

  try {
      const adminMail = {
      from: email,
      to: 'laura1331.lz@gmail.com',
      subject: 'Nova kontakt poruka s weba',
      text: `Ime: ${ime}\nEmail: ${email}\nTelefon: ${telefon}\nPoruka:\n${poruka}`,
    };

    const userMail = {
      from: '"Restoran Delicije" <laura1331.lz@gmail.com>',
      to: email,
      subject: 'Vaša poruka je zaprimljena – Restoran Delicije',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #b45f06;">Poštovani ${ime},</h2>

          <p>Zahvaljujemo Vam što ste nas kontaktirali putem obrasca na našoj web stranici.</p>

          <p>Vaša poruka je uspješno zaprimljena i javit ćemo Vam se u najkraćem mogućem roku.</p>

          <hr style="border: none; border-top: 1px solid #ccc;" />

          <p><strong>Vaša poruka:</strong></p>
          <blockquote style="margin: 10px 0; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #cd7f32;">
            ${poruka}
          </blockquote>

          ${telefon ? `<p><strong>Telefon:</strong> ${telefon}</p>` : ''}

          <p style="margin-top: 30px;">Srdačan pozdrav,<br><strong>Restoran Delicije</strong></p>
        </div>
      `
    };


    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.json({ success: true, message: 'Poruka poslana!' });
  } catch (err) {
    console.error("Greška pri slanju maila:", err);
    res.status(500).json({ message: 'Greška pri slanju e-maila.' });
  }
});

module.exports = { router, transporter };
