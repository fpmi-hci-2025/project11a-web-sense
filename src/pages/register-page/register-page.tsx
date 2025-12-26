import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Alert } from '@mui/material';
import { Button } from '../../components/button';
import { useAuth } from '../../api/auth/useAuth';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import styles from './register-page.module.css';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-z0-9_]+$/;
    return usernameRegex.test(username);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      isValid = false;
    } else if (username.length > 20) {
      setUsernameError('Username must be at most 20 characters');
      isValid = false;
    } else if (!validateUsername(username)) {
      setUsernameError(
        'Username must contain only lowercase letters, numbers, and underscores',
      );
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Incorrect email');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password is required');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
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
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleUsernameChange = (value: string) => {
    const sanitizedValue = value
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')
      .slice(0, 20);
    setUsername(sanitizedValue);

    if (!sanitizedValue.trim()) {
      setUsernameError('Username is required');
    } else if (sanitizedValue.length < 5) {
      setUsernameError('Username must be at least 5 characters');
    } else if (sanitizedValue.length > 20) {
      setUsernameError('Username must be at most 20 characters');
    } else if (!validateUsername(sanitizedValue)) {
      setUsernameError(
        'Username must contain only lowercase letters, numbers, and underscores',
      );
    } else {
      setUsernameError(null);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Incorrect email');
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!value.trim()) {
      setPasswordError('Password is required');
    } else if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (!value.trim()) {
      setConfirmPasswordError('Confirm password is required');
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
  };

  return (
    <div>
      <Header
        showAvatar={false}
        showLogo={true}
        showLoginButton={false}
        showSearch={false}
      />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Register</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <Alert severity="error" className={styles.alert}>
                {error}
              </Alert>
            )}
            <TextField
              className={styles.textField}
              label="Username"
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
              fullWidth
              margin="normal"
              disabled={loading}
              autoComplete="username"
              inputProps={{
                maxLength: 20,
                pattern: '[a-z0-9_]+',
              }}
            />
            <TextField
              className={styles.textField}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
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
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              fullWidth
              margin="normal"
              disabled={loading}
              autoComplete="new-password"
            />
            <TextField
              className={styles.textField}
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              fullWidth
              margin="normal"
              disabled={loading}
              autoComplete="new-password"
            />
            <Button
              variant="filled"
              label={loading ? 'Register...' : 'Register'}
              type="submit"
              disabled={loading}
            />
            <div className={styles.linkWrapper}>
              <span>Already have an account? </span>
              <Link to="/auth/login" className={styles.link}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
