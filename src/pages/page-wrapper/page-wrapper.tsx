import { useAuth } from '../../api/auth/useAuth';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

import styles from './page-wrapper.module.css';

interface PageWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { user } = useAuth();

  return (
    <div>
      <Header
        showLogo={true}
        showAvatar={!!user}
        showLoginButton={!user}
        showSearch={!!user}
      />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};
