import axios from 'axios';
import { isTokenValid } from '../utils/tokenUtils';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && isTokenValid(token)) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else if (token) {
    localStorage.removeItem('accessToken');
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAdminOnlyRoute = url.includes('/orders/all');

    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    } else if (error.response?.status === 403 && isAdminOnlyRoute) {
      console.warn('Access denied:', url);
    }
    return Promise.reject(error);
  }
);

export default api;
