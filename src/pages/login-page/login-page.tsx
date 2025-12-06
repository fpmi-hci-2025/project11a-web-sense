import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '../../components/button';
import { useAuth } from '../../api/auth/useAuth';
import styles from './login-page.module.css';
import { PageWrapper } from '../page-wrapper/page-wrapper';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login: loginUser, loading } = useAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    setLoginError(null);
    setPasswordError(null);

    if (!login.trim()) {
      setLoginError('Login is required');
      isValid = false;
    } else if (login.length < 5) {
      setLoginError('Incorrect login');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await loginUser(login, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <PageWrapper>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            className={styles.textField}
            label="Login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            error={!!loginError}
            helperText={loginError}
            fullWidth
            margin="normal"
            disabled={loading}
            autoComplete="username"
          />
          <TextField
            className={styles.textField}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            fullWidth
            margin="normal"
            disabled={loading}
            autoComplete="current-password"
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button
            variant="filled"
            label={loading ? 'Login...' : 'Login'}
            type="submit"
            disabled={loading}
          />
          <div className={styles.linkWrapper}>
            <span>Don't have an account? </span>
            <Link to="/auth/register" className={styles.link}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

