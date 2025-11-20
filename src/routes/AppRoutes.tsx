import { Routes, Route } from 'react-router-dom';
import type { AppRoute } from './types';
import PrivateRoute from './PrivateRoute';
import { routes } from './routes';
import { HomePage } from '../pages/HomePage/HomePage';

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
  return (
    <Routes>
      {renderRoutes(routes)}
      <Route index element={<HomePage />} />
    </Routes>
  );
}
