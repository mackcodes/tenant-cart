import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("tc_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      localStorage.removeItem("tc_user");
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("tc_token") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("tc_token", token);
    } else {
      localStorage.removeItem("tc_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "tc_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("tc_user");
    }
  }, [user]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("tc_token");
    localStorage.removeItem("tc_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);