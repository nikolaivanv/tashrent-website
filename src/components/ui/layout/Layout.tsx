import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
// import Header from '../header/Header';
// import { Toaster } from '../toast/Toaster';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <Header /> */}
      <main className="overflow-x-hidden">{children}</main>
      {/* <Toaster /> */}
    </ThemeProvider>
  );
}

export default Layout;
