import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, children }) {
  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Wrong role
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // ✅ Allowed
  return children;
}
