import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '../header/Header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  );
}

export default Layout;
