'use client';

import { createContext, useState, useEffect } from 'react';

export interface ThemeContextProps {
  headerTheme: string;
  setHeaderTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  headerTheme: 'light',
  setHeaderTheme: () => {}
});

export interface ShopifyProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = (props: ShopifyProviderProps) => {
  const { children } = props;
  const [headerTheme, setHeaderTheme] = useState('light');

  return (
    <ThemeContext.Provider
      value={{
        headerTheme,
        setHeaderTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
