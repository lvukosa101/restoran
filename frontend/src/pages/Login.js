import { useState } from "react";
import { useNavigate} from "react-router-dom";
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
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        lozinka: password
      });
    
      //pohranjujemo korisnicke podatake u localStorage
      localStorage.setItem('currentUser', JSON.stringify(response.data.user)); //sprema se cijeli korisnicki objekt
      localStorage.setItem('token', response.data.token); //sprema se token
  
      const role = response.data.user?.role;
      console.log("Role:", role);
      
      if (role === "gost") {
        navigate("/guest-home");
      } else if (role === "moderator") {
        navigate("/moderator-home");
      } else if (role === "administrator") {
        navigate("/admin-home");
      }
    } catch (error) {
      setError("Neispravan email ili lozinka.");
      console.error(error);
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
 
export default Login;
