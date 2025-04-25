import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Lozinke se ne podudaraju.");
      return;
    }

    setError("");
    console.log("Registracija:", { name, email, password });
    // ovdje poziv na backend
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registriraj se</button>
      </form>
    </div>
  );
}

export default Register;
