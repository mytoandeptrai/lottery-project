'use client';
import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import HomeConnectWallet from '@/modules/Home/components/home-connect-wallet';
import HomeInformation from '@/modules/Home/components/home-information';
import HomeLanding from '@/modules/Home/components/home-landing';
import HomeStatistic from '@/modules/Home/components/home-statistic';
import HomeTitle from '@/modules/Home/components/home-title';
import HomeWheel from '@/modules/Home/components/home-wheel';
import HomeWinnerTable from '@/modules/Home/components/home-winner-table';
import React from 'react';
import { useAccount, useChains, useConnect, useDisconnect, useReadContract } from 'wagmi';
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

  // const {
  //   writeContractAsync: buyTicketWrite,
  //   data: buyTicketData,
  //   isPending: isBuyingTicket,
  //   error: buyTicketError,
  //   reset: resetBuyTicket,
  // } = useWriteContract();

  // const buyTicket = async () => {
  //   try {
  //     const temp = await buyTicketWrite({
  //       address: ADDRESS_CONTRACT,
  //       abi: ABI,
  //       functionName: 'startNewDraw',
  //       args: [BigInt(new Date().getTime())],
  //       value: 0.001 * 10 ** 18,
  //     });
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // const {
  //   isLoading: isConfirming,
  //   isSuccess: isConfirmed,
  //   error: error1,
  // } = useWaitForTransactionReceipt({
  //   hash: buyTicketData,
  // });

  // console.log('buyTicketError', buyTicketError, error1?.message, error1?.cause, error1?.name);

  // useEffect(() => {
  //   if (buyTicketError) {
  //     handleToastError(buyTicketError);
  //   }
  // }, [buyTicketError]);

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
