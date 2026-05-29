import React, { createContext, useState } from 'react';
import { login as loginApi, register as registerApi } from '../api/authApi';
import { isTokenValid } from '../utils/tokenUtils';

export const AuthContext = createContext(null);

const readStoredSession = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  const session = isTokenValid(token);
  if (!session) {
    localStorage.removeItem('accessToken');
    return null;
  }
  return session;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredSession);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    const token = data.token || data.accessToken;
    if (!token) throw new Error("No token received from backend");
    localStorage.setItem('accessToken', token);
    const session = isTokenValid(token);
    if (!session) throw new Error('Received an invalid or expired token');
    setUser(session);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerApi(name, email, password);
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
