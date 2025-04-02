import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, Ticket, Trophy } from 'lucide-react';
import React, { useState } from 'react';
import Loading from './loading';
import { useAccount } from 'wagmi';

const HomeAction = () => {
  const { isConnected, isConnecting } = useAccount();
  const [isBuyingTicket, setIsBuyingTicket] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isStartingNewDraw, setIsStartingNewDraw] = useState(false);
  const [drawCompleted, setDrawCompleted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [participants, setParticipants] = useState([1, 2, 3, 4, 5]);
  const [ticketPrice, setTicketPrice] = useState(0.01);
  const [prizePool, setPrizePool] = useState(0);
  const [winner, setWinner] = useState('');

  const handleBuyTicket = () => {
    setIsBuyingTicket(true);
    // Simulate API call
    setTimeout(() => {
      setIsBuyingTicket(false);
    }, 2000);
  };

  const performDraw = () => {
    setIsDrawing(true);
    // Simulate API call
    setTimeout(() => {
      setIsDrawing(false);
    }, 2000);
  };

  const claimPrize = () => {
    setIsClaiming(true);
    // Simulate API call
    setTimeout(() => {
      setIsClaiming(false);
    }, 2000);
  };

  const startNewDraw = () => {
    setIsStartingNewDraw(true);
    // Simulate API call
    setTimeout(() => {
      setIsStartingNewDraw(false);
    }, 2000);
  };

  if (isConnecting) return <Loading />;

  if (!isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lottery Actions</CardTitle>
        <CardDescription>Participate in the lottery</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button className='w-full' onClick={handleBuyTicket} disabled={!isConnected || isBuyingTicket || drawCompleted}>
          {isBuyingTicket ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Buying Ticket...
            </>
          ) : (
            <>
              <Ticket className='mr-2 h-4 w-4' /> Buy Ticket
            </>
          )}
        </Button>

        <Button
          className='w-full'
          onClick={performDraw}
          disabled={!isConnected || isDrawing || drawCompleted || participants.length < 2}
        >
          {isDrawing ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Performing Draw...
            </>
          ) : (
            <>
              <Trophy className='mr-2 h-4 w-4' /> Perform Draw
            </>
          )}
        </Button>

        {drawCompleted && isWinner && (
          <Button className='w-full' variant='default' onClick={claimPrize} disabled={!isConnected || isClaiming}>
            {isClaiming ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Claiming Prize...
              </>
            ) : (
              <>
                <Trophy className='mr-2 h-4 w-4' /> Claim Prize
              </>
            )}
          </Button>
        )}

        {drawCompleted && (
          <Button
            className='w-full'
            variant='outline'
            onClick={startNewDraw}
            disabled={!isConnected || isStartingNewDraw}
          >
            {isStartingNewDraw ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Starting New Draw...
              </>
            ) : (
              <>
                <RefreshCw className='mr-2 h-4 w-4' /> Start New Draw
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default HomeAction;
