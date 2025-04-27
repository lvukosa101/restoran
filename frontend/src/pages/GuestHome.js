import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

function GuestHome() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate("/");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Dobrodošli, {currentUser?.name}!</h2>
      <p>Ovo je početna stranica za gosta.</p>
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
}

export default GuestHome;
