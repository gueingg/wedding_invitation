'use client';
import { createContext, useContext } from 'react';

const basePrefix =
  process.env.NODE_ENV === 'production' ? '/wedding_invitation' : '';

const PrefixContext = createContext<string>(basePrefix);

export const usePrefix = () => useContext(PrefixContext);

export const PrefixProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrefixContext.Provider value={basePrefix}>
      {children}
    </PrefixContext.Provider>
  );
};
