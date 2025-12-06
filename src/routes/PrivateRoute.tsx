import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../api/auth/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/auth/login" replace />;
}
