import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Dobrodošli!</h1>
      <button onClick={() => navigate("/login")} style={{ margin: '10px', padding: '10px 20px' }}>
        User Login
      </button>
      <button onClick={() => navigate("/register")} style={{ margin: '10px', padding: '10px 20px' }}>
        User Registration
      </button>
    </div>
  );
}

export default HomePage;
