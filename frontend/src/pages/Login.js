import { useState } from "react";
import { useNavigate} from "react-router-dom";
import users from '../data/users'
import '../styles/Login.css'; 
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
  
    if (foundUser) {
      console.log("Prijavljen korisnik:", foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
  
      if (foundUser.role === "gost") {
        navigate("/guest-home");
      } else if (foundUser.role === "moderator") {
        navigate("/moderator-home");
      } else if (foundUser.role === "administrator") {
        navigate("/admin-home");
      }
    } else {
      setError("Neispravan email ili lozinka.");
    }
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button text="Prijavi se" type="submit" />
      </form>
    </div>
  );
}

/*
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
  */
 
export default Login;
