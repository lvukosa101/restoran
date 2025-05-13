import './App.css';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestHome from './pages/GuestHome';
import ModeratorHome from './pages/ModeratorHome';
import AdminHome from './pages/AdminHome';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/guest-home" element={<GuestHome />} />
      <Route path="/moderator-home" element={<ModeratorHome />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/rezervacija" element={<ReservationPage />} />
    </Routes>
  );
}

export default App;