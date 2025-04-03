import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useHomeStatus } from '@/hooks/use-home-status';
import { formatAddress } from '@/utils/common';
import { Loader2, RefreshCw } from 'lucide-react';
import React from 'react';
import Loading from './loading';
const HomeStatus = () => {
  const {
    participantCount,
    currentPrize,
    isDrawCompleted,
    winner,
    isLoadingAll,
    isConnected,
    userTicket,
    ticketPrice,
    isFetchingAll,
    onRefreshData,
  } = useHomeStatus();

  if (isLoadingAll) return <Loading />;

  if (!isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lottery Status</CardTitle>
        <CardDescription>Current lottery information and statistics</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Ticket Price:</span>
          <span className='font-medium'>{ticketPrice} ETH</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Prize Pool:</span>
          <span className='font-medium'>{currentPrize} ETH</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Participants:</span>
          <span className='font-medium'>{participantCount}</span>
        </div>
        {userTicket && (
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Your Ticket:</span>
            <span className='font-medium'>{userTicket}</span>
          </div>
        )}
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Draw Status:</span>
          <Badge variant={isDrawCompleted ? 'default' : 'outline'}>
            {isDrawCompleted ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
        {isDrawCompleted && winner && (
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Winner:</span>
            <span className='font-medium'>{formatAddress(winner)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='w-full' onClick={onRefreshData} disabled={isFetchingAll}>
          {isFetchingAll ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className='mr-2 h-4 w-4' /> Refresh Data
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeStatus;
