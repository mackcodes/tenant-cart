import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterStore from './pages/RegisterStore';
import ProtectedRoute from './components/ProtectedRoute';

function Dashboard() {
  return <div style={{ padding: '2rem' }}>Merchant dashboard placeholder</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-store" element={<RegisterStore />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireStore>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}