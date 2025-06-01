import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestHome from './pages/GuestHome';
import ModeratorHome from './pages/ModeratorHome';
import AdminHome from './pages/AdminHome';
import ReservationPage from './pages/ReservationPage';
import ModeratorReservation from './pages/ModeratorReservation';
import UserProfile from './pages/UserProfile';
import AdminAddUser from './pages/AdminAddUser';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  //ovo samo u development fazi za provjeru - ispis podataka
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");

    console.log("Prijavljeni korisnik:", user);
    console.log("JWT token:", token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/guest-home" element={
        <ProtectedRoute allowedRoles={['gost']}>
          <GuestHome />
        </ProtectedRoute>
      } />

      <Route path="/moderator-home" element={
        <ProtectedRoute allowedRoles={['moderator']}>
          <ModeratorHome />
        </ProtectedRoute>
      } />

      <Route path="/admin-home" element={
        <ProtectedRoute allowedRoles={['administrator']}>
          <AdminHome />
        </ProtectedRoute>
      } />

      <Route path="/rezervacija" element={
        <ProtectedRoute allowedRoles={['gost', 'moderator', 'administrator']}>
          <ReservationPage />
        </ProtectedRoute>
      } />

      <Route path="/moderator-reservation" element={
        <ProtectedRoute allowedRoles={['moderator', 'administrator']}>
          <ModeratorReservation />
        </ProtectedRoute>
      } />

      <Route path="/user-profile" element={
        <ProtectedRoute allowedRoles={['gost', 'moderator', 'administrator']}>
          <UserProfile />
        </ProtectedRoute>
      } />

      <Route path="/admin-add-user" element={
        <ProtectedRoute allowedRoles={['administrator']}>
          <AdminAddUser />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
