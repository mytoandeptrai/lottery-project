'use client';
import HomeConnectWallet from '@/modules/Home/components/home-connect-wallet';
import HomeInformation from '@/modules/Home/components/home-information';
import HomeLanding from '@/modules/Home/components/home-landing';
import HomeStatistic from '@/modules/Home/components/home-statistic';
import HomeTitle from '@/modules/Home/components/home-title';
import HomeWheel from '@/modules/Home/components/home-wheel';
import HomeWinnerTable from '@/modules/Home/components/home-winner-table';
import React from 'react';
const Home = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        <HomeTitle />
        <HomeConnectWallet />
      </div>

      <HomeLanding />
      <HomeInformation />
      <HomeStatistic />
      <HomeWheel />
      <HomeWinnerTable />
    </div>
  );
};

export default Home;
