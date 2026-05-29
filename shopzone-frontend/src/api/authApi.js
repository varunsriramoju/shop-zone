import axiosInstance from './axiosInstance';

// Login – returns JWT token
export const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data; // expects { accessToken, ... }
};

// Register – creates new user
export const register = async (name, email, password) => {
  const response = await axiosInstance.post('/auth/register', { name, email, password });
  return response.data;
};

export const logout = () => {
  // Simply remove token from storage; backend is stateless
  localStorage.removeItem('accessToken');
};
