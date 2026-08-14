import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);
const TOKEN_KEY = 'tenantcart_token';

function decodeToken(token) {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => decodeToken(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setUser(decodeToken(token));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  }, [token]);

  function setToken(newToken) {
    setTokenState(newToken);
  }

  function logout() {
    setTokenState(null);
  }

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    hasStore: !!user?.tenantId,
    setToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}