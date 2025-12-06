import { Alert, CircularProgress } from '@mui/material';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

import styles from './page-wrapper.module.css';

interface PageWrapperProps {
  children: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  isError?: boolean;
}

export const PageWrapper = ({ children, isLoading, isError }: PageWrapperProps) => {
  return (
    <div>
      <Header showAvatar={false} showLogo={true} showLoginButton={true} />
      <div className={styles.content}>
        { 
          isError && 
          <Alert severity="error" className={styles.error}>
              Something went wrong
          </Alert>
        }
        { isLoading ? 
          <div className={styles.loaderWrapper}>
            <CircularProgress size={90} color='inherit'/>
          </div>
        : children }
      </div>
      <Footer />
    </div>
  );
};
