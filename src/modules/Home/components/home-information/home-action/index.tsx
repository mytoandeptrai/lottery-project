import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BuyTicketAction from '@/modules/Home/components/home-information/home-action/buy-ticket-action';
import ClaimPrizeTicket from '@/modules/Home/components/home-information/home-action/claim-prize-action';
import StartNewDrawAction from '@/modules/Home/components/home-information/home-action/start-new-draw-action';
import React from 'react';
import { useAccount } from 'wagmi';
import Loading from './loading';

const HomeAction = () => {
  const { isConnected, isConnecting } = useAccount();

  if (isConnecting) return <Loading />;
  if (!isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lottery Actions</CardTitle>
        <CardDescription>Participate in the lottery</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <StartNewDrawAction />
        <BuyTicketAction />
        <ClaimPrizeTicket />
      </CardContent>
    </Card>
  );
};

export default HomeAction;
