import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      // token istekao
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    return <Navigate to="/login" replace />;
  }
}
