import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        lozinka: password // ✅ jer backend očekuje 'lozinka', ne 'password'
      });

      const user = response.data.user;
      const token = response.data.token;

      if (!user || !token) {
        setError("Neispravni podaci s poslužitelja.");
        return;
      }

      // Spremi korisnika i token u localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', token);

      const role = user?.role?.toLowerCase();

      console.log("Ulogirani korisnik:", user);
      console.log("Korisnička uloga:", role);

      // Preusmjeri korisnika na temelju uloge
      switch (role) {
        case "gost":
          navigate("/guest-home");
          break;
        case "moderator":
          navigate("/moderator-home");
          break;
        case "administrator":
        case "admin":
          navigate("/admin-home");
          break;
        default:
          setError("Nepoznata korisnička uloga.");
      }

    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Došlo je do greške pri prijavi.");
      }
      console.error("Greška prilikom logina:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Prijava</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button text="Prijavi se" type="submit" />
      </form>
    </div>
  );
}

export default Login;
