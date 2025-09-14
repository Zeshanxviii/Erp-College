import React from 'react';
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  requiredRole: 'admin' | 'faculty' | 'student';
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  // const token = localStorage.getItem(`${requiredRole}Token`);
  const token = localStorage.getItem("authToken");

  console.log( token, " rendered token from ProtectedRoute")
  
  if (!token) {
    // Redirect to login page, saving current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
