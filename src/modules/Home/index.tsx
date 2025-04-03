'use client';
import { ADDRESS_CONTRACT } from '@/config/smart-contract';
import { ABI } from '@/config/smart-contract';
import HomeConnectWallet from '@/modules/Home/components/home-connect-wallet';
import HomeInformation from '@/modules/Home/components/home-information';
import HomeLanding from '@/modules/Home/components/home-landing';
import HomeStatistic from '@/modules/Home/components/home-statistic';
import HomeTitle from '@/modules/Home/components/home-title';
import HomeWheel from '@/modules/Home/components/home-wheel';
import { handleToastError } from '@/utils/common';
import React, { useEffect } from 'react';
import { useAccount, useChains, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi';
const Home = () => {
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, isConnecting } = useAccount();
  const chain = useChains();

  const { data: currentDrawInfo, isLoading: isLoadingCurrentDrawInfo } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getParticipantCount',
  });

  const {
    writeContractAsync: buyTicketWrite,
    data: buyTicketData,
    isPending: isBuyingTicket,
    error: buyTicketError,
    reset: resetBuyTicket,
  } = useWriteContract();

  const buyTicket = async () => {
    buyTicketWrite({
      address: ADDRESS_CONTRACT,
      abi: ABI,
      functionName: 'buyTicket',
    });
  };

  useEffect(() => {
    if (buyTicketError) {
      handleToastError(buyTicketError);
    }
  }, [buyTicketError]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        {/* <h1 className='mb-2 font-bold text-4xl'>Web3 Lottery</h1>
        <p className='mb-6 text-muted-foreground'>The fairest, most transparent lottery on the blockchain. Buy tickets, win prizes, and have fun!</p> */}

        <HomeTitle />
        <HomeConnectWallet />
      </div>
      <HomeLanding />
      <HomeInformation />
      <HomeStatistic />
      <HomeWheel />
    </div>
  );
};

export default Home;
