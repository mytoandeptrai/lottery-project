'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHomeStatistic } from '@/hooks/use-home-statistic';
import { formatAddress } from '@/utils/common';
import React from 'react';
import Loading from './loading';

const HomeStatistic = () => {
  const { participants, isLoadingAll, isConnected } = useHomeStatistic();

  if (isLoadingAll) return <Loading />;

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
            <Badge key={index} variant={'outline'} className='justify-center py-2' title={participant.toString()}>
              {formatAddress(participant.toString(), 10)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeStatistic;
