'use client';

import HomeAction from '@/modules/Home/components/home-information/home-action';
import HomeStatus from '@/modules/Home/components/home-information/home-status';
import React from 'react';

const HomeInformation = () => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <HomeStatus />
      <HomeAction />
    </div>
  );
};

export default HomeInformation;
