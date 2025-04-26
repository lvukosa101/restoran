import { useState } from "react";
import '../styles/Login.css'; 
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prijava:", { email, password });
    // ovdje poziv na backend
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <Button text="Prijavi se" type="submit" /> 
      </form>
    </div>
  );
}

export default Login;
