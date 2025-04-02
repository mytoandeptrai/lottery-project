import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAddress } from '@/utils/common';
import { RefreshCw } from 'lucide-react';
import React from 'react';
import Loading from './loading';
import { useAccount } from 'wagmi';
const HomeStatus = () => {
  const { isConnected, isConnecting } = useAccount();
  const ticketPrice = 0.01;
  const prizePool = 100;
  const participants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const drawCompleted = true;
  const winner = '0x1234567890123456789012345678901234567890';
  const ticket = 1;

  if (isConnecting) return <Loading />;

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
          <span className='font-medium'>{prizePool} ETH</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Participants:</span>
          <span className='font-medium'>{participants.length}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Your Ticket:</span>
          <span className='font-medium'>{ticket}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Draw Status:</span>
          <Badge variant={drawCompleted ? 'default' : 'outline'}>{drawCompleted ? 'Completed' : 'In Progress'}</Badge>
        </div>
        {drawCompleted && winner && (
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Winner:</span>
            <span className='font-medium'>{formatAddress(winner)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='w-full'>
          <RefreshCw className='mr-2 h-4 w-4' /> Refresh Data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomeStatus;
