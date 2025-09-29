import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This component protects routes that require an officer login
const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is logged in AND is an officer
  const isAuth = user && user.token && user.role === 'officer';
  
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
