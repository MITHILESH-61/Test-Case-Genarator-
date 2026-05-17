import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

export const ProtectedRoute = () => {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const loadMe = useAuthStore((state) => state.loadMe);

  useEffect(() => {
    if (token && !user) {
      loadMe();
    }
  }, [token, user, loadMe]);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

