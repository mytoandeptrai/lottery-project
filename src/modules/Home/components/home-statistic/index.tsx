'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAddress } from '@/utils/common';
import React from 'react';
import { useAccount } from 'wagmi';
import Loading from './loading';

const HomeStatistic = () => {
  const { isConnected, isConnecting } = useAccount();
  const participants = [1, 2, 3, 4, 5];
  const winner = participants[Math.floor(Math.random() * participants.length)];

  if (isConnecting) return <Loading />;

  if (!isConnected || participants.length === 0) return null;

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
        <CardDescription>List of all participants in the current lottery</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
          {participants.map((participant, index) => (
            <Badge key={index} variant={winner === participant ? 'default' : 'outline'} className='justify-center py-2'>
              {formatAddress(participant.toString())}
              {winner === participant && ' (Winner)'}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeStatistic;
