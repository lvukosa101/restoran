import { useState } from "react";
import axios from "axios";
import '../styles/Register.css';
import Button from '../components/Button';
import Header from '../components/Header';

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Lozinke se ne podudaraju.");
      return;
    }

    if (!name || !surname || !email || !password) {
      setError("Sva obavezna polja moraju biti ispunjena.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        ime: name,
        prezime: surname,
        email,
        lozinka: password,
        broj_tel: phone || '',
        role: "gost"
      });

      setSuccess("Registracija uspješna! Sada se možete prijaviti.");
      console.log("Registracija:", response.data);
    } catch (error) {
      setError("Greška pri registraciji.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>Registracija</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br /><br />

          <input
            type="text"
            placeholder="Prezime"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          /><br /><br />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />

          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />

          <input
            type="password"
            placeholder="Ponovi lozinku"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          /><br /><br />

          <input
            type="text"
            placeholder="Broj telefona (opcionalno)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          /><br /><br />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <Button text="Registriraj se" type="submit" />
        </form>
      </div>
    </>
  );
}

export default Register;
