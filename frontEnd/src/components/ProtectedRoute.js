import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireStore = false }) {
  const { isAuthenticated, hasStore } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireStore && !hasStore) return <Navigate to="/register-store" replace />;

  return children;
}