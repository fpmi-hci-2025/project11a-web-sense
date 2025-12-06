import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '../../components/button';
import { useAuth } from '../../api/auth/useAuth';
import styles from './login-page.module.css';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { PageWrapper } from '../page-wrapper/page-wrapper';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);

    if (!email.trim()) {
      setEmailError('Email обязателен');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Некорректный email');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Пароль обязателен');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
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
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    }
  };

  return (
    <PageWrapper>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            className={styles.textField}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            fullWidth
            margin="normal"
            disabled={loading}
            autoComplete="email"
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

