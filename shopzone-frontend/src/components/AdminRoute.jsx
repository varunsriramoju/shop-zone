import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Renders child routes only for users with ADMIN role
const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'ADMIN';
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
