import { Zap } from 'lucide-react';
import React from 'react';

const HomeTitle = () => {
  return (
    <div className='relative flex flex-col items-center'>
      <div className='relative'>
        <h1 className='mb-2 font-extrabold text-3xl text-primary sm:text-4xp md:text-5xl'>CryptoChance</h1>

        <div className='-right-8 absolute top-0 rotate-12 transform'>
          <Zap className='h-8 w-8 text-yellow-500' />
        </div>
      </div>

      <div className='flex items-center space-x-2'>
        <div className='h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50'></div>
        <p className='text-muted-foreground text-sm sm:text-base md:text-xl'>Web3 Lottery</p>
        <div className='h-[1px] w-12 bg-gradient-to-r from-primary/50 to-transparent'></div>
      </div>

      <p className='mt-4 max-w-2xl text-center text-sm sm:text-base md:text-lg'>
        The fairest, most transparent lottery on the blockchain.
        <span className='hidden md:inline'> Buy tickets, win prizes, and have fun!</span>
      </p>
    </div>
  );
};

export default HomeTitle;
