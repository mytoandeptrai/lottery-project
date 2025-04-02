'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ADDRESS_CONTRACT } from '@/config/smart-contract';
import { ABI } from '@/config/smart-contract';
import HomeInformation from '@/modules/Home/components/home-information';
import HomeStatistic from '@/modules/Home/components/home-statistic';
import HomeWheel from '@/modules/Home/components/home-wheel';
import { formatAddress, handleToastError } from '@/utils/common';
import { Wallet } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useAccount, useChains, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
const Home = () => {
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
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
        <h1 className='mb-2 font-bold text-4xl'>Web3 Lottery</h1>
        <p className='mb-6 text-muted-foreground'>Buy tickets, win prizes, have fun!</p>

        {/* <Button onClick={buyTicket} className="flex items-center">
            Buy Ticket
          </Button> */}

        {!isConnected ? (
          <Button onClick={() => connect({ connector: metaMask() })} className='flex items-center'>
            <Wallet className='mr-2 h-4 w-4' /> Connect Wallet
          </Button>
        ) : (
          <div className='flex flex-col items-center'>
            <Badge
              variant='outline'
              className='mb-2'
              onClick={() =>
                toast('Event has been created.', {
                  description: 'This is a description',
                  action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo'),
                  },
                })
              }
            >
              Connected: {formatAddress(address!)}
            </Badge>
            <Button variant='outline' size='sm' onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
        )}
      </div>
      <HomeInformation />
      <HomeStatistic />
      <HomeWheel />
    </div>
  );
};

export default Home;
