import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api, { login as loginApi } from "../services/api"; // We'll update api.js next

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.user.id });
    }
  }, []);

  const login = async (credentials) => {
    const { token } = await loginApi(credentials);
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.user.id });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
