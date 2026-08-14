import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerStore } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function RegisterStore() {
  const [storeName, setStoreName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/register');
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await registerStore({ storeName });
      setToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create store');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Name your store</h1>
        <p className="auth-subtitle">Step 2 of 2 — this becomes your storefront URL</p>

        <form onSubmit={handleSubmit}>
          <label>Store name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            placeholder="e.g. Nova Streetwear"
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Setting up...' : 'Create store'}
          </button>
        </form>
      </div>
    </div>
  );
}