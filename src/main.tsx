import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './api/auth/useAuth';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const basename =
  import.meta.env.MODE === 'production'
    ? '/project11a-web-sense/'
    : '/project11a-web-sense/staging/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
