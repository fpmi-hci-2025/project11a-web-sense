import { useEffect, useState } from 'react';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Logo } from '../../components/logo';

import styles from './homePage.module.css';

export const HomePage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  return (
    <div>
      <Header showAvatar={true} showLogo={true} />
      <div className={styles.content}>
        <Logo
          size="large"
          className={`${styles.logo} ${loaded ? styles.loaded : ''}`}
        />
      </div>
      <Footer />
    </div>
  );
};
