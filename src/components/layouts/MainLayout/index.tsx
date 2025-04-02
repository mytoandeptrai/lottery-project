import React, { type PropsWithChildren } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { GoToTopButton } from '@/components/ui/go-to-top-button';
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className='min-h-screen'>
        {children}
        <GoToTopButton />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
