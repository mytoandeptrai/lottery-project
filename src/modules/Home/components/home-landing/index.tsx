import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LOTTERY_FACTS, TESTIMONIALS } from '@/modules/Home/components/home-landing/config';
import { Coins, Info, Ticket, Users, Zap, Trophy } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const HomeLanding = () => {
  const [randomFact, setRandomFact] = useState('');
  const { address, isConnected, isConnecting } = useAccount();

  // Sample data for the mockup => should replace from SMC
  const SAMPLE_DATA = {
    ticketPrice: '0.001',
    prizePool: '0.24',
    participants: [
      '0x1234567890123456789012345678901234567890',
      '0x2345678901234567890123456789012345678901',
      '0x3456789012345678901234567890123456789012',
      '0x4567890123456789012345678901234567890123',
      '0x5678901234567890123456789012345678901234',
      '0x6789012345678901234567890123456789012345',
      '0x7890123456789012345678901234567890123456',
      '0x8901234567890123456789012345678901234567',
      '0x9012345678901234567890123456789012345678',
      '0x0123456789012345678901234567890123456789',
      '0xabcdef1234567890123456789012345678901234',
      '0xbcdef1234567890123456789012345678901234a',
    ],
    userAddress: '0x1234567890123456789012345678901234567890',
    winner: null,
    drawCompleted: false,
  };

  // Get a random fact on initial load and every 10 seconds
  useEffect(() => {
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * LOTTERY_FACTS.length);
      setRandomFact(LOTTERY_FACTS[randomIndex]);
    };

    getRandomFact();
    const interval = setInterval(getRandomFact, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isConnected) return null;

  return (
    <div className='mb-8 space-y-8'>
      {/* Current lottery stats */}
      <Card className='border-none bg-gradient-to-r from-purple-50 to-blue-50 shadow-md dark:from-purple-950/20 dark:to-blue-950/20'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Current Lottery Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 text-center md:grid-cols-3'>
            <div className='flex flex-col items-center'>
              <Coins className='mb-2 h-12 w-12 text-purple-500' />
              <h3 className='font-semibold text-xl'>Prize Pool</h3>
              <p className='font-bold text-3xl'>{SAMPLE_DATA.prizePool} ETH</p>
            </div>
            <div className='flex flex-col items-center'>
              <Users className='mb-2 h-12 w-12 text-blue-500' />
              <h3 className='font-semibold text-xl'>Participants</h3>
              <p className='font-bold text-3xl'>{SAMPLE_DATA.participants.length}</p>
            </div>
            <div className='flex flex-col items-center'>
              <Ticket className='mb-2 h-12 w-12 text-green-500' />
              <h3 className='font-semibold text-xl'>Ticket Price</h3>
              <p className='font-bold text-3xl'>{SAMPLE_DATA.ticketPrice} ETH</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <div className='flex items-center text-muted-foreground text-sm'>
            <Info className='mr-2 h-4 w-4' />
            <p>Connect your wallet to participate in this lottery</p>
          </div>
        </CardFooter>
      </Card>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <Zap className='mr-2 h-5 w-5 text-yellow-500' />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='flex items-start'>
              <div className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900'>
                <span className='font-bold'>1</span>
              </div>
              <div>
                <h3 className='mb-1 font-semibold'>Connect Your Wallet</h3>
                <p className='text-muted-foreground'>
                  Connect your Ethereum wallet to get started. We support MetaMask and other popular wallets.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900'>
                <span className='font-bold'>2</span>
              </div>
              <div>
                <h3 className='mb-1 font-semibold'>Buy a Ticket</h3>
                <p className='text-muted-foreground'>
                  Purchase a lottery ticket for {SAMPLE_DATA.ticketPrice} ETH. Each wallet can buy one ticket.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
                <span className='font-bold'>3</span>
              </div>
              <div>
                <h3 className='mb-1 font-semibold'>Wait for the Draw</h3>
                <p className='text-muted-foreground'>
                  Once enough participants join, owner can trigger the draw. The smart contract randomly selects a
                  winner.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900'>
                <span className='font-bold'>4</span>
              </div>
              <div>
                <h3 className='mb-1 font-semibold'>Claim Your Prize</h3>
                <p className='text-muted-foreground'>
                  If you win, claim your prize with a single click. The entire prize pool will be transferred to your
                  wallet.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {TESTIMONIALS.map((testimonial, index) => (
          <Card key={index} className='border-t-4 border-t-purple-500'>
            <CardHeader>
              <CardTitle className='text-lg'>{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='italic'>"{testimonial.text}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fun fact */}
      <Card className='border-none bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20'>
        <CardContent className='pt-6'>
          <div className='flex items-start'>
            <div className='mr-4 flex-shrink-0 rounded-full bg-yellow-100 p-3 dark:bg-yellow-900'>
              <Trophy className='h-6 w-6 text-yellow-600 dark:text-yellow-400' />
            </div>
            <div>
              <h3 className='mb-2 font-semibold text-lg'>Did you know?</h3>
              <p className='text-muted-foreground'>{randomFact}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeLanding;
