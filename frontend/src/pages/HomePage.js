import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css';
import Button from '../components/Button';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Dobrodošli!</h1>
      <Button 
        text="User Login" 
        onClick={() => navigate("/login")} 
      />
      <Button 
        text="User Registration" 
        onClick={() => navigate("/register")} 
      />
    </div>
  );
}

export default HomePage;
