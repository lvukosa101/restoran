import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

function GuestHome() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate("/");
  };

  const handleStartReservation = () => {
    navigate("/rezervacija");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Dobrodošli, {currentUser?.ime}!</h2>
      <p>Ovo je početna stranica za gosta.</p>
      <div style={{ margin: '20px' }}>
        <Button text="Započni rezervaciju" onClick={handleStartReservation} />
      </div>
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
}

export default GuestHome;
