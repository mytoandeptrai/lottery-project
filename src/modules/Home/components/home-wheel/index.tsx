import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WheelOfLuckyGame from '@/components/ui/wheel-of-lucky-game';
import { useWheel } from '@/hooks/use-wheel';
import React from 'react';
import Loading from './loading';

const wheelData = Array.from({ length: 10 }, (_, i) => ({
  option: `Ticket ${i + 1}`,
}));

const HomeWheel = () => {
  const {
    isConnected,
    isConnecting,
    mustSpin,
    prizeNumber,
    isSpinning,
    selectedTicket,
    isOwner,
    handleStopSpinning,
    handleSpinClick,
  } = useWheel();

  if (isConnecting) return <Loading />;

  if (!isConnected) return null;

  return (
    <div className='mx-auto mt-6 flex w-full flex-col items-center justify-center'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-center font-bold text-2xl'>Lottery Wheel</CardTitle>
          <CardDescription className='text-center'>
            {isOwner
              ? 'Spin the wheel to select the winning ticket'
              : 'Only the owner can spin the wheel after 5 participants'}
          </CardDescription>
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
                  disabled={isSpinning || !isOwner}
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
