import { Routes, Route } from 'react-router-dom';
import type { AppRoute } from './types';
import PrivateRoute from './PrivateRoute';
import { routes } from './routes';
import { HomePage } from '../pages/home-page/home-page';
import { useAuth } from '../api/auth/useAuth';
import { CircularProgress } from '@mui/material';

import styles from './route.module.css';

function renderRoutes(routeList: AppRoute[]) {
  return routeList.map((route) => {
    const Element = route.protected ? (
      <PrivateRoute>{route.element}</PrivateRoute>
    ) : (
      route.element
    );

    return (
      <Route key={route.path} path={route.path} element={Element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}

export default function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <CircularProgress size={90} color="inherit" />
      </div>
    )
  }

  return (
    <Routes>
      {renderRoutes(routes)}
      <Route index element={<HomePage />} />
    </Routes>
  );
}
