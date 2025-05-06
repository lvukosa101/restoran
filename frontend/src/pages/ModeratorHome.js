import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

function ModeratorHome() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Dobrodošli, {currentUser?.ime}!</h2>
      <p>Ovo je početna stranica za moderatora (konobara).</p>
      <Button text="Logout" onClick={handleLogout} />
    </div>
  );
}

export default ModeratorHome;
