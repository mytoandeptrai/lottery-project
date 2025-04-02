import React, { useState, useCallback } from 'react';
import WheelOfLuckyGame from '@/components/ui/wheel-of-lucky-game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import Loading from './loading';

// Mock data for the wheel
const wheelData = Array.from({ length: 10 }, (_, i) => ({
  option: `Ticket ${i + 1}`,
  // style: {
  //   backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
  //   textColor: i % 2 === 0 ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))',
  // },
}));

const HomeWheel = () => {
  const { isConnected, isConnecting } = useAccount();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  // Mock function to interact with smart contract
  const sendToSmartContract = useCallback((ticketNumber: number) => {
    // This would be replaced with actual smart contract interaction
    console.log(`Sending ticket number ${ticketNumber} to smart contract`);

    // Simulate transaction delay
    setTimeout(() => {
      toast.success('Transaction Successful', {
        description: `Ticket ${ticketNumber} has been selected and sent to the blockchain.`,
      });
    }, 1500);
  }, []);

  const handleSpinClick = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setMustSpin(true);

    // Generate a random number between 0 and 9 (for 10 tickets)
    const randomNumber = Math.floor(Math.random() * 10);
    setPrizeNumber(randomNumber);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setIsSpinning(false);

    // Get the selected ticket number (0-based index)
    const selectedTicketNumber = prizeNumber + 1;
    setSelectedTicket(selectedTicketNumber);

    // Send to smart contract
    sendToSmartContract(selectedTicketNumber);
  };

  const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'white' } },
    { option: '2' },
  ];

  if (isConnecting) return <Loading />;

  if (!isConnected) return null;

  return (
    <div className='mx-auto mt-6 flex w-full flex-col items-center justify-center'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-center font-bold text-2xl'>Lottery Wheel</CardTitle>
          <CardDescription className='text-center'>Spin the wheel to select your ticket number</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center'>
          <div className='relative mb-6 aspect-square w-full max-w-md'>
            <WheelOfLuckyGame
              data={wheelData}
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              onStopSpinning={handleStopSpinning}
              textColors={['#f5f5f5']}
              spinDuration={1}
              outerBorderWidth={3}
              innerBorderWidth={2}
              innerRadius={0}
              radiusLineWidth={1}
              perpendicularText={false}
              textDistance={60}
              outerBorderColor='#f5f5f5'
              backgroundColors={[
                '#3f297e',
                '#175fa9',
                '#169ed8',
                '#239b63',
                '#64b031',
                '#efe61f',
                '#f7a416',
                '#e6471d',
                '#dc0936',
                '#e5177b',
              ]}
            />
            <div className='absolute inset-0 z-50 flex items-center justify-center'>
              <div className='rounded-full bg-white p-1 shadow-lg'>
                <Button
                  onClick={handleSpinClick}
                  disabled={isSpinning}
                  size='lg'
                  className='h-20 w-20 rounded-full font-bold text-sm transition-transform hover:scale-105'
                  variant='outline'
                >
                  {isSpinning ? 'Spinning...' : 'SPIN'}
                </Button>
              </div>
            </div>
          </div>

          {selectedTicket && (
            <div className='mb-6 rounded-lg bg-muted p-4 text-center'>
              <p className='font-medium text-lg'>
                Selected Ticket: <span className='font-bold text-primary'>{selectedTicket}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeWheel;
