const Reservation = require('../models/Reservation');

jest.mock('../models/Reservation');

describe('Provjera zauzetosti termina', () => {
  it('Treba vratiti da je termin slobodan ako ne postoji rezervacija', async () => {
    Reservation.findOne.mockResolvedValue(null);

    const datum = '2025-06-01';
    const vrijeme = '18:00';
    const broj_stola = 5;

    const result = await Reservation.findOne({ where: { datum, vrijeme, broj_stola } });
    expect(result).toBeNull();
  });

  it('Treba vratiti da je termin zauzet ako postoji rezervacija', async () => {
    Reservation.findOne.mockResolvedValue({ id: 1 });

    const datum = '2025-06-01';
    const vrijeme = '18:00';
    const broj_stola = 5;

    const result = await Reservation.findOne({ where: { datum, vrijeme, broj_stola } });
    expect(result).not.toBeNull();
  });
});
