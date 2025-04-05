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
    isOwner,
    isIndexingScan,
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
              <div className='ml-2 rounded-full bg-white shadow-lg sm:ml-0 sm:p-0.5 md:p-1'>
                <Button
                  onClick={handleSpinClick}
                  disabled={isSpinning || !isOwner || isIndexingScan}
                  size='lg'
                  className='h-10 w-10 rounded-full font-normal text-sm transition-transform hover:scale-105 md:h-20 md:w-20 md:font-bold'
                  variant='outline'
                >
                  {isSpinning ? 'Spinning...' : 'Spin'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeWheel;
