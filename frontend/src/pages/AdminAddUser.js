import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
import '../styles/AdminAddUser.css';


export default function AdminAddUser() {
  const [form, setForm] = useState({
    ime: '',
    prezime: '',
    email: '',
    lozinka: '',
    broj_tel: '',
    role_id: ''
  });

  const [roles, setRoles] = useState([]);
  const [poruka, setPoruka] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/roles')
      .then(res => setRoles(res.data))
      .catch(() => setPoruka('Greška pri dohvaćanju uloga.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', form);
      setPoruka('✅ Korisnik dodan uspješno!');
      setForm({ ime: '', prezime: '', email: '', lozinka: '', broj_tel: '', role_id: '' });
    } catch (err) {
      setPoruka('❌ ' + (err.response?.data?.message || 'Greška pri dodavanju.'));
    }
  };

  return (
    <>
        <HeaderAdmin />
        <div className="admin-add-user-container">
        <h3>Dodaj novog korisnika</h3>
        <form onSubmit={handleSubmit} className="admin-add-user-form">
            <input placeholder="Ime" value={form.ime} onChange={e => setForm({ ...form, ime: e.target.value })} required style={{ width: '100%', marginBottom: 10 }} />
            <input placeholder="Prezime" value={form.prezime} onChange={e => setForm({ ...form, prezime: e.target.value })} required style={{ width: '100%', marginBottom: 10 }} />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ width: '100%', marginBottom: 10 }} />
            <input type="password" placeholder="Lozinka" value={form.lozinka} onChange={e => setForm({ ...form, lozinka: e.target.value })} required style={{ width: '100%', marginBottom: 10 }} />
            <input placeholder="Broj telefona" value={form.broj_tel} onChange={e => setForm({ ...form, broj_tel: e.target.value })} style={{ width: '100%', marginBottom: 10 }} />

            <select value={form.role_id} onChange={e => setForm({ ...form, role_id: e.target.value })} required style={{ width: '100%', marginBottom: 20 }}>
            <option value="">-- Odaberi ulogu --</option>
            {roles.map(r => (
                <option key={r.role_id} value={r.role_id}>{r.naziv_role}</option>
            ))}
            </select>

            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 5 }}>Dodaj korisnika</button>
        </form>

        {poruka && <p className="admin-add-user-message">{poruka}</p>}
        </div>
    </>
  );
}
