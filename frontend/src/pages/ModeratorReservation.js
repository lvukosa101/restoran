import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModeratorReservation() {
  const [rezervacije, setRezervacije] = useState([]);
  const [filterDatum, setFilterDatum] = useState('');
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchRezervacije();
  }, []);

  const fetchRezervacije = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rezervacije');
      setRezervacije(response.data);
    } catch (err) {
      console.error('Greška pri dohvaćanju rezervacija:', err);
    }
  };

  const promijeniStatus = async (id, noviStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/rezervacije/${id}/status`, { status: noviStatus });
      fetchRezervacije();
    } catch (err) {
      console.error('Greška pri ažuriranju statusa:', err);
    }
  };

  const obrisiRezervaciju = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovu rezervaciju?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/rezervacije/${id}`);
      fetchRezervacije();
    } catch (err) {
      console.error("Greška pri brisanju rezervacije:", err);
    }
  };

  const filtriraneRezervacije = filterDatum
    ? rezervacije.filter(r => r.datum === filterDatum)
    : rezervacije;

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '95%', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#2c2c2c',
        color: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 0 12px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Pregled rezervacija</h2>

        {currentUser && (
          <h4 style={{ textAlign: 'center', marginBottom: '30px', color: '#ccc' }}>
            Dobrodošli, {currentUser.ime}!
          </h4>
        )}

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <label><strong>Filtriraj po datumu:</strong>&nbsp;</label>
          <input
            type="date"
            value={filterDatum}
            onChange={(e) => setFilterDatum(e.target.value)}
            style={{ padding: '5px 10px' }}
          />
          {filterDatum && (
            <button
              onClick={() => setFilterDatum('')}
              style={{
                marginLeft: '10px',
                padding: '5px 12px',
                backgroundColor: '#777',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              Poništi filter
            </button>
          )}
        </div>

        <table cellPadding="10" style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'center',
          fontSize: '15px',
          backgroundColor: '#1e1e1e',
          color: 'white'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#444' }}>
              <th>ID</th>
              <th>Korisnik</th>
              <th>Email</th>
              <th>Datum</th>
              <th>Vrijeme</th>
              <th>Stol</th>
              <th>Napomena</th>
              <th>Status</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {filtriraneRezervacije.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #555' }}>
                <td>{r.id}</td>
                <td>{r.korisnik_ime} {r.korisnik_prezime}</td>
                <td>{r.korisnik_email}</td>
                <td>{r.datum}</td>
                <td>{r.vrijeme}</td>
                <td>{r.broj_stola}</td>
                <td>{r.napomena || '/'}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === 'Na čekanju' ? (
                    <>
                      <button
                        onClick={() => promijeniStatus(r.id, 'Odobreno')}
                        style={{ marginRight: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => promijeniStatus(r.id, 'Odbijeno')}
                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <span>{r.status}</span>
                  )}
                  <br />
                  <button
                    onClick={() => obrisiRezervaciju(r.id)}
                    style={{
                      marginTop: '5px',
                      backgroundColor: '#666',
                      color: 'white',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑 Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtriraneRezervacije.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#aaa' }}>
            Nema rezervacija za odabrani datum.
          </p>
        )}
      </div>
    </div>
  );
}
