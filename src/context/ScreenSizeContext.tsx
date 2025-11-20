import React, { createContext, useContext, useEffect, useState } from 'react';

export type ScreenSize = 'small' | 'medium' | 'large';

const ScreenSizeContext = createContext<ScreenSize>('large');

export const ScreenSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('large');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth <= 480) {
        setScreenSize('small');
      } else if (window.innerWidth <= 768) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => useContext(ScreenSizeContext);
